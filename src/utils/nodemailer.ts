import {createTransport} from "nodemailer";
import { mailInfo } from "../types";

async function sendMail(data: mailInfo) {
  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_MAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const verificationUrl = `https://ai-trainer-app.vercel.app/verify/${data.to}/${data.verifyCode}`;
  const htmlContent = `
    <h1>¡Bienvenido a  AITrainer!</h1>
      <p>¡Solo necesitas verificar tu cuenta para empezar a usar AITrainer!</p>
      <a href="${verificationUrl}" style="padding: 10px 20px; background-color: blue; color: white; text-decoration: none; border-radius: 5px;">
        Verificar
      </a>
    `;
  await transporter.sendMail({
    from: process.env.NODEMAILER_MAIL,
    to: data.to,
    subject: "Verificacion AITrainer",
    html: htmlContent,
  });
}

export default sendMail;
