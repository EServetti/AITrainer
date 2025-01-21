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
function recoverEmail(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const transport = (0, nodemailer_1.createTransport)({
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
        yield transport.sendMail({
            from: `AITrainer <${process.env.NODEMAILER_MAIL}>`,
            to: data.to,
            subject: `Update password`,
            html: htmlContent,
        });
    });
}
exports.default = recoverEmail;
