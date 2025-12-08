import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,     // your Gmail
        pass: process.env.EMAIL_PASS,     // app password
      },
    });
  }

  async sendResetEmail(to: string, token: string) {
  const resetLink = `https://mean-task-api.web.app/reset-password/${token}`;


  return this.transporter.sendMail({
    from: `"Task App" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Password Reset Request',
    html: `
  <div style="
    width:100%;
    background-color:#f5f5f7;
    padding:40px 0;
    font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
  ">
    <div style="
      max-width:600px;
      margin:0 auto;
      background:white;
      border-radius:16px;
      padding:40px 35px;
      box-shadow:0 8px 25px rgba(0,0,0,0.08);
      text-align:center;
    ">

      <!-- Logo -->
      <div style="margin-bottom:25px;">
        <img src="https://cdn-icons-png.flaticon.com/512/565/565547.png" width="60" style="opacity:0.9;" />
      </div>

      <h2 style="font-size:26px; margin-bottom:10px; color:#111;">
        Reset Your Password
      </h2>
      <p style="font-size:15px; color:#555; margin-top:0;">
        You're receiving this email because you requested a password reset.
      </p>

      <!-- Button -->
      <a href="${resetLink}" style="
        display:inline-block;
        margin:30px 0;
        padding:14px 28px;
        font-size:16px;
        font-weight:600;
        color:white;
        background:linear-gradient(90deg,#6a5af9,#ff4f9a);
        border-radius:50px;
        text-decoration:none;
        box-shadow:0 4px 14px rgba(0,0,0,0.15);
      ">
        Reset Password
      </a>

      <!-- Backup link -->
      <p style="font-size:14px; color:#666; margin-top:25px;">
        Or copy and paste this link in your browser:
      </p>

      <p style="font-size:13px; color:#6a6a6a; word-break:break-all;">
        ${resetLink}
      </p>

      <div style="
        margin-top:35px;
        padding-top:20px;
        border-top:1px solid #eee;
        font-size:13px;
        color:#999;
      ">
        <p>If you didn’t request a password reset, you can safely ignore this email.</p>
        <p style="margin-top:10px;">© ${new Date().getFullYear()} Task App. All rights reserved.</p>
      </div>
    </div>
  </div>
`
,
  });
}

}
