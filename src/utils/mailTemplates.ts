export const referralMailHTML = (code: string, link: string) => {
  return `
 <div
  style="
    font-family: Arial, sans-serif;
    background-color: #f9fafb;
    padding: 20px;
  "
>
  <div
    style="
      max-width: 500px;
      margin: auto;
      background: #ffffff;
      border-radius: 8px;
      padding: 20px;
      border: 1px solid #e5e7eb;
    "
  >
    <h2 style="color: #111827; margin-bottom: 10px">
      🎉 Your Referral Worked!
    </h2>

    <p style="color: #374151; font-size: 14px">Hi there,</p>

    <p style="color: #374151; font-size: 14px">
      Great news! Someone just used your referral link successfully.
    </p>

    <div
      style="
        margin: 20px 0;
        padding: 10px;
        background: #f3f4f6;
        border-radius: 6px;
        text-align: center;
      "
    >
      <span style="font-weight: bold; color: #111827">
        Referral Code: ${code}
      </span>
      <br />
      <span style="font-weight: bold; color: #111827">
        Referral Link: <a href="${link}">${link}</a>
      </span>
    </div>

    <p style="color: #374151; font-size: 14px">
      Keep sharing your link to earn more rewards
    </p>

    <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb" />

    <p style="color: #9ca3af; font-size: 12px; text-align: center">
      This is an automated message from your referral system.
    </p>
  </div>
</div>
`;
};

export const referralMailText = (code: string, link: string) => {
  return `
Your Referral Worked!
Hi there,

Great news! Someone just used your referral link successfully.

Referral Code: ${code}
Referral Link: ${link}
Keep sharing your link to earn more rewards

This is an automated message from your referral system.
`;
};
