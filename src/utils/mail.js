import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://taskmanagelink.com",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHTML = mailGenerator.generate(options.mailgenContent);

  const transpoter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: "mail.taskmanager@example.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHTML,
  };
  try {
    await transpoter.sendMail(mail);
  } catch (error) {
    console.error("Email service failed siliendly");
  }
};

const emailVerificationMailgen = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our App! we' are excited to have you on board.",
      action: {
        instructions: "To verify your email please click on the button",
        button: {
          color: "#22BC66",
          text: "Verify your email",
          link: verificationUrl,
        },
      },
      outro: "Need Help, or have question? Just reply to E-mail",
    },
  };
};

const forgotPasswordMailgen = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We got a request to reset the password of your account",
      action: {
        instructions: "To reset the password",
        button: {
          color: "#da3e1fff",
          text: "Reset password",
          link: passwordResetUrl,
        },
      },
      outro: "Need Help, or have question? Just reply to E-mail",
    },
  };
};

export { emailVerificationMailgen, forgotPasswordMailgen,sendEmail };
