import formData from "form-data";
import Mailgun from "mailgun.js";
import { generateTemplate } from "./templater";

export async function sendEmail(to: string, type: "verifyEmail" | "requestResetPasswordPin", templateData: Record<string, any>) {
  const API_KEY = process.env.MAILGUN_API_KEY!;
  const DOMAIN = process.env.MAILGUN_SENDING_DOMAIN!;
  const FROM_EMAIL = process.env.FROM_EMAIL!;

  const from = FROM_EMAIL;
  let subject = "";
  let template = "";

  switch (type) {
    case "verifyEmail":
      template = "emailVerification.html";
      subject = "Email Verification | GymRobot";
      break;

    case "requestResetPasswordPin":
      template = "resetPassword.html";
      subject = "Reset Password | GymRobot";
      break;

    default:
      return false;
  }

  const htmlContent = await generateTemplate(template, templateData);
  if (!htmlContent) return false;

  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({ username: "api", key: API_KEY });

  const data = {
    from: `GymRobot <${from}>`,
    to,
    subject,
    html: htmlContent,
  };

  const response = await mg.messages.create(DOMAIN, data);
  if (response.status !== 200) return false;

  return true;
}
