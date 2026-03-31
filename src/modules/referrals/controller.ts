import type { Request, Response } from "express";
import { nanoid } from "nanoid";
import { prisma } from "../../config/db.ts";

export const CreateReferral = async (req: Request, res: Response) => {
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

    const referral = await prisma.referral.create({
      data: {
        referrerEmail,
        targetUrl: parsedUrl.toString(),
        code,
      },
    });

    return res.status(201).json(referral);
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", error: `Something went wrong: ${error}` });
  }
};

export const GetAllReferrals = async (req: Request, res: Response) => {
  try {
    const referrals = await prisma.referral.findMany({});
    return res.status(200).json({ status: "success", data: referrals });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", error: `Something went wrong: ${error}` });
  }
};

export const RedirectReferral = async (req: Request, res: Response) => {
  try {
    let code = req.params.code;
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

    await prisma.click.create({
      data: {
        referralCode: code,
      },
    });

    return res.redirect(`${referral.targetUrl}?ref=${code}`);
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", error: `Something went wrong: ${error}` });
  }
};
