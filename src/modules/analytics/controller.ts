import type { Request, Response } from "express";
import { prisma } from "../../config/db.ts";

export const getAnalyticsSummary = async (req: Request, res: Response) => {
  try {
    const totalReferrals = await prisma.referral.count();
    const totalClicks = await prisma.click.count();
    const totalConversions = await prisma.referral.count({
      where: { converted: true },
    });

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
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const data = referrals.map((referral) => {
      const clicks = referral._count.clicks;
      const conversionRate =
        clicks === 0
          ? 0
          : Number((((referral.converted ? 1 : 0) / clicks) * 100).toFixed(2));

      return {
        code: referral.code,
        referrerEmail: referral.referrerEmail,
        targetUrl: referral.targetUrl,
        converted: referral.converted,
        convertedAt: referral.convertedAt,
        expiresAt: referral.expiresAt,
        clicks,
        conversionRate,
      };
    });

    return res.status(200).json({ status: "success", data: data });
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
    const conversionRate =
      clicks === 0
        ? 0
        : Number((((referral.converted ? 1 : 0) / clicks) * 100).toFixed(2));

    return res.status(200).json({
      status: "success",
      data: {
        code: referral.code,
        referrerEmail: referral.referrerEmail,
        targetUrl: referral.targetUrl,
        clicks,
        converted: referral.converted,
        convertedAt: referral.convertedAt,
        expiresAt: referral.expiresAt,
        conversionRate,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "failed", error: "Something went wrong" });
  }
};
