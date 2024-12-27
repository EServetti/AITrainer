"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
function sendMail(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const transporter = (0, nodemailer_1.createTransport)({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.NODEMAILER_MAIL,
                pass: process.env.NODEMAILER_PASSWORD,
            },
        });
        const verificationUrl = `https://localhost:5173/verify/${data.to}/${data.verifyCode}`;
        const htmlContent = `
    <h1>¡Bienvenido a  AITrainer!</h1>
      <p>¡Solo necesitas verificar tu cuenta para empezar a usar AITrainer!</p>
      <a href="${verificationUrl}" style="padding: 10px 20px; background-color: blue; color: white; text-decoration: none; border-radius: 5px;">
        Verificar
      </a>
    `;
        yield transporter.sendMail({
            from: process.env.NODEMAILER_MAIL,
            to: data.to,
            subject: "Verificacion AITrainer",
            html: htmlContent,
        });
    });
}
exports.default = sendMail;
