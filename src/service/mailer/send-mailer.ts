import nodemailer from "nodemailer"
import { config } from 'dotenv'
import { AppError } from "../../errors/app-error";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import fs from "fs";
import ejs from "ejs";
import { htmlToText } from "html-to-text";
import juice from "juice";

config({
  path: '.env'
})

class Mailer {
  private to: string;
  private subject: string;
  private text: string;
  private template: string;
  private context: object;
  private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor(to: string, subject: string, text: string, template: string, context = {}){
    this.to = to;
    this.subject = subject;
    this.template = template;
    this.context = context;
    this.transporter = this.buildTransporter();
  }

  public sendEmail(): void {
    const mailOptions = this.buildMailOptions();

    this.transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        throw new AppError('Erro ao enviar email', 500)
      } else {
        console.log('Email enviado: ' + info.response);
      }
    });
  }

  private buildMailOptions() {
    const templatePath = `src/service/mailer/templates/${this.template}.html`;
    const template = fs.readFileSync(templatePath, "utf-8");
    const html = ejs.render(template, this.context);
    const htmlWithStylesInlined = juice(html);

    return {
      from: process.env.EMAIL,
      to: this.to,
      subject: this.subject,
      text: this.text,
      html: htmlWithStylesInlined,
      context: this.context,
      attachments: [{
        filename: 'logo.png',
        path: "public/img/logo.png",
        cid: "logo"
      }]
    }
  }

  private buildTransporter() {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      },
    });

    return transporter;
  }
}

export default Mailer;
