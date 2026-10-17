export interface LeadEmailPayload {
  fullName: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  timestamp: string;
  siteName?: string;
}

export async function sendLeadNotificationEmail(payload: LeadEmailPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.NOTIFICATION_DESTINATION_EMAIL;
  const fromEmail = process.env.FROM_EMAIL || "Sunrisers Leeds <inquiries@resend.dev>";

  if (!apiKey || !toEmail) {
    console.warn("[Resend Warning]: Missing RESEND_API_KEY or NOTIFICATION_DESTINATION_EMAIL in env. Skipping email dispatch.");
    return false;
  }

  const { fullName, email, phone, service, message, timestamp, siteName } = payload;
  const subject = `🏏 New Inquiry: ${fullName} - ${service}`;

  const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry Received</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #070a12; margin: 0; padding: 24px; color: #f8fafc;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #0f172a; border: 1px solid #1e293b; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.4);">
    <tr>
      <td style="padding: 24px 32px; background: linear-gradient(135deg, #1e293b, #0f172a); border-bottom: 2px solid #ff6b00;">
        <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #ff6b00;">${siteName || "Sunrisers Leeds"} &bull; Instant Notification</span>
        <h1 style="margin: 8px 0 0 0; font-size: 22px; font-weight: 800; color: #ffffff;">New Fan / Membership Inquiry</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 24px 32px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td width="35%" style="padding: 10px 0; color: #94a3b8; font-size: 14px; font-weight: 600; border-bottom: 1px solid #1e293b;">Name:</td>
            <td width="65%" style="padding: 10px 0; color: #ffffff; font-size: 14px; font-weight: 700; border-bottom: 1px solid #1e293b;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #94a3b8; font-size: 14px; font-weight: 600; border-bottom: 1px solid #1e293b;">Email Address:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #1e293b;">
              <a href="mailto:${email}" style="color: #ff6b00; font-size: 14px; text-decoration: none; font-weight: 600;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #94a3b8; font-size: 14px; font-weight: 600; border-bottom: 1px solid #1e293b;">Phone:</td>
            <td style="padding: 10px 0; color: #ffffff; font-size: 14px; border-bottom: 1px solid #1e293b;">
              ${phone ? `<a href="tel:${phone}" style="color: #ff6b00; text-decoration: none;">${phone}</a>` : '<span style="color: #64748b;">Not provided</span>'}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #94a3b8; font-size: 14px; font-weight: 600; border-bottom: 1px solid #1e293b;">Topic / Area:</td>
            <td style="padding: 10px 0; color: #f59e0b; font-size: 14px; font-weight: 700; border-bottom: 1px solid #1e293b;">${service}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #94a3b8; font-size: 14px; font-weight: 600; border-bottom: 1px solid #1e293b;">Timestamp:</td>
            <td style="padding: 10px 0; color: #94a3b8; font-size: 13px; border-bottom: 1px solid #1e293b;">${timestamp}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 16px; background-color: #070a12; border-left: 3px solid #ff6b00; border-radius: 4px;">
          <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.05em;">Message Body:</p>
          <p style="margin: 0; font-size: 14px; color: #e2e8f0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject,
        html: htmlBody
      })
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[Resend API Error]:", res.status, err);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[Resend Network Error]:", error);
    return false;
  }
}
