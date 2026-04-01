import type { Request, Response } from "express";
import { prisma } from "../../config/db.ts";

export const getAnalyticsSummary = async (req: Request, res: Response) => {
  try {
    const totalReferrals = await prisma.referral.count();
    const totalClicks = await prisma.click.count();
    const totalConversions = await prisma.conversion.count();

    const conversionRate =
      totalClicks === 0
        ? 0
        : Number(((totalConversions / totalClicks) * 100).toFixed(2));

    return res.status(200).json({
      status: "success",
      data: { totalReferrals, totalClicks, totalConversions, conversionRate },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "failed", error: "Something went wrong" });
  }
};

export const getReferralAnalytics = async (req: Request, res: Response) => {
  try {
    const referrals = await prisma.referral.findMany({
      include: {
        _count: {
          select: {
            clicks: true,
            conversions: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const data = referrals.map((referral) => {
      const clicks = referral._count.clicks;
      const conversions = referral._count.conversions;

      const conversionRate =
        clicks === 0 ? 0 : Number(((conversions / clicks) * 100).toFixed(2));

      return {
        code: referral.code,
        referrerEmail: referral.referrerEmail,
        targetUrl: referral.targetUrl,
        clicks,
        conversions,
        conversionRate,
        expiresAt: referral.expiresAt,
      };
    });

    return res.status(200).json({ status: "success", data });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "failed", error: "Something went wrong" });
  }
};

export const getSingleReferralAnalytics = async (
  req: Request,
  res: Response,
) => {
  try {
    let { code } = req.params;
    if (Array.isArray(code)) code = code[0];

    if (!code) {
      return res
        .status(400)
        .json({ status: "failed", error: "Referral code is required" });
    }

    const referral = await prisma.referral.findUnique({
      where: { code },
      include: {
        _count: {
          select: {
            clicks: true,
            conversions: true,
          },
        },
      },
    });

    if (!referral) {
      return res.status(404).json({
        status: "failed",
        error: "Referral not found",
      });
    }

    const clicks = referral._count.clicks;
    const conversions = referral._count.conversions;

    const conversionRate =
      clicks === 0 ? 0 : Number(((conversions / clicks) * 100).toFixed(2));

    return res.status(200).json({
      status: "success",
      data: {
        code: referral.code,
        referrerEmail: referral.referrerEmail,
        targetUrl: referral.targetUrl,
        clicks,
        conversions,
        conversionRate,
        expiresAt: referral.expiresAt,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "failed", error: "Something went wrong" });
  }
};
