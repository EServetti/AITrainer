import { createTransport } from "nodemailer";
import { mailInfo, recoverInfo } from "../types";

async function recoverEmail(data: recoverInfo) {
    const transport = createTransport({
        host: "smtp.gmail.com",
        port: 465, 
        secure: true,
        auth: {
            user: process.env.NODEMAILER_MAIL,
            pass: process.env.NODEMAILER_PASSWORD
        }
    });
    const resetUrl = `https://ai-trainer-app.vercel.app/password/${data.token}`;
    const htmlContent = `
    <p>You requested a password reset. Please click on the following link to reset your password: </p>
    <a href="${resetUrl}" style="padding: 10px 20px; background-color: blue; color: white; text-decoration: none; border-radius: 5px;">
        Do it here
    </a>
    <p>If you didn't request this, please ignore this email.</p>`;
    await transport.sendMail({
        from: `AITrainer <${process.env.NODEMAILER_MAIL}>`,
        to: data.to,
        subject: `Update password`,
        html: htmlContent,
      });
}

export default recoverEmail