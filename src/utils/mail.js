import { text } from "express";
import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Project Management App",
      link: "https://project-management-app.com",
    },
  });
  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_TRAP_SMTP_HOST,
    port: process.env.MAIL_TRAP_SMTP_PORT,
    auth: {
      user: process.env.MAIL_TRAP_SMTP_USER,
      pass: process.env.MAIL_TRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: "Project.management@example.com ",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };
  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
// generate email body

const emailVerificationMaingenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro:
        "Welcome to our project management app! We're excited to have you on board.",
      action: {
        instructions: "Click the button below to verify your email address:",
        button: {
          color: "#22BC66",
          text: "Verify Email",
          link: verificationUrl,
        },
      },
      outro:
        "If you didn't create an account with us, please ignore this email.",
    },
  };
};

const forgotPasswordMaingenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro:
        "You have requested to reset your password. Please click the button below to proceed.",
      action: {
        instructions: "Click the button below to reset your password:",
        button: {
          color: "#22BC66",
          text: "Reset Password",
          link: passwordResetUrl,
        },
      },
      outro:
        "If you didn't create an account with us, please ignore this email.",
    },
  };
};

export {
  emailVerificationMaingenContent,
  forgotPasswordMaingenContent,
  sendEmail,
};
