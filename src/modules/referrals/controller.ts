import type { Request, Response } from "express";
import { nanoid } from "nanoid";
import { prisma } from "../../config/db.ts";

export const CreateReferral = async (req: Request, res: Response) => {
  try {
    const { referrerEmail, targetUrl } = req.body;
    const code = nanoid(8);

    const referral = await prisma.referral.create({
      data: {
        referrerEmail,
        targetUrl,
        code,
      },
    });

    res.status(201).json(referral);
  } catch (error) {
    res.status(500).json({ error: `Something went wrong: ${error}` });
  }
};
