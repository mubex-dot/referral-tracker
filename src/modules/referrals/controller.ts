import type { Request, Response } from "express";
import { nanoid } from "nanoid";
import { prisma } from "../../config/db.ts";
import { SendMail } from "../../utils/mailer.ts";
import {
  referralMailHTML,
  referralMailText,
} from "../../utils/mailTemplates.ts";
import { getBaseUrl } from "../../utils/getBaseUrl.ts";

export const createReferral = async (req: Request, res: Response) => {
  try {
    const { referrerEmail, targetUrl } = req.body;
    const code = nanoid(8);

    if (!referrerEmail || !targetUrl) {
      return res.status(400).json({
        status: "failed",
        message: "Both referrer email and target url are needed",
      });
    }

    let parsedUrl: URL;

    try {
      parsedUrl = new URL(targetUrl);
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        error:
          "targetUrl must be a valid absolute URL, e.g. https://www.google.com",
      });
    }

    const existing = await prisma.referral.findFirst({
      where: { referrerEmail, targetUrl: parsedUrl.toString() },
    });

    if (existing) {
      return res.status(200).json({
        status: "success",
        message: "referral exists already",
        data: existing,
      });
    }

    const origin = getBaseUrl(req);
    const referralLink = `${origin}/referrals/redirect/${code}`;

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const referral = await prisma.referral.create({
      data: {
        referrerEmail,
        targetUrl: parsedUrl.toString(),
        code,
        referralLink,
        expiresAt,
      },
    });

    return res.status(201).json({
      status: "success",
      message: "referral created successfully",
      data: referral,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "failed", error: `Something went wrong` });
  }
};

export const getAllReferrals = async (req: Request, res: Response) => {
  try {
    const referrals = await prisma.referral.findMany({
      include: { _count: { select: { clicks: true, conversions: true } } },
    });
    return res.status(200).json({ status: "success", data: referrals });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "failed", error: `Something went wrong` });
  }
};

export const redirectReferral = async (req: Request, res: Response) => {
  try {
    let { code } = req.params;
    if (Array.isArray(code)) code = code[0];

    if (!code) {
      return res
        .status(400)
        .json({ status: "failed", error: "Referral code is required" });
    }

    const referral = await prisma.referral.findUnique({ where: { code } });

    if (!referral) {
      return res
        .status(404)
        .json({ status: "failed", error: "Referral not found" });
    }

    if (new Date() > referral.expiresAt) {
      return res
        .status(410)
        .json({ status: "failed", error: "Referral link expired" });
    }

    await prisma.click.create({
      data: {
        referralId: referral.id,
      },
    });

    const url = new URL(referral.targetUrl);
    url.searchParams.set("ref", code);

    return res.redirect(url.toString());
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "failed", error: `Something went wrong` });
  }
};

export const convertReferral = async (req: Request, res: Response) => {
  try {
    const { referralCode } = req.body;

    if (!referralCode) {
      return res
        .status(400)
        .json({ status: "failed", error: "Referral code is required" });
    }

    const referral = await prisma.referral.findUnique({
      where: { code: referralCode },
    });

    if (!referral) {
      return res
        .status(404)
        .json({ status: "failed", error: "Referral not found" });
    }

    const clicks = await prisma.click.count({
      where: { referralId: referral.id },
    });

    const conversions = await prisma.conversion.count({
      where: { referralId: referral.id },
    });

    if (conversions >= clicks) {
      return res.status(400).json({
        status: "failed",
        error: `You only have ${clicks} clicks. You can't convert more times than the number of clicks`,
      });
    }

    await prisma.conversion.create({
      data: {
        referralId: referral.id,
      },
    });

    SendMail({
      to: referral.referrerEmail,
      subject: "Your Referral has been converted successfully!",
      text: referralMailText(referralCode, referral.referralLink),
      html: referralMailHTML(referralCode, referral.referralLink),
    });

    return res.status(200).json({
      status: "success",
      message: "Referral conversion has been recorded",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "failed", error: `Something went wrong` });
  }
};
