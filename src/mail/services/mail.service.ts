import * as nodemailer from "nodemailer";
import * as path from "path";
import mailHandlebars, { HbsTransporter } from "nodemailer-express-handlebars";
import { ConfigServer } from "../../config/config";
import { AuthService } from "../../auth/services/auth.service";
import { UserService } from "../../user/services/user.service";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { dateFormtat } from "../utils/dateFormat";

export class MailService extends ConfigServer {
  private transport!:
    | nodemailer.Transporter<SMTPTransport.SentMessageInfo>
    | HbsTransporter;
  private handlebarsOptions!: mailHandlebars.NodemailerExpressHandlebarsOptions;
  public resolve!: boolean;
  constructor(
    private readonly authService: AuthService = new AuthService(),
    private readonly userService: UserService = new UserService()
  ) {
    super();
    this.transport = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 465,
      secure: true,
      auth: {
        user: "apikey",
        pass: this.getEnvironment("MAIL_API_KEY") || "",
      },
    });

    this.handlebarsOptions = {
      viewEngine: {
        extname: ".handlebars",
        partialsDir: path.join(process.cwd(), "src/templates"),
        defaultLayout: false,
      },
      viewPath: path.join(process.cwd(), "src/templates"),
      extName: ".handlebars",
    };

    this.transport.use("compile", mailHandlebars(this.handlebarsOptions));
  }

  public createMail(msg: string, to: string, subject: string) {
    return this.transport.sendMail(
      {
        from: "coderrdev@gmail.com", // verified sender email
        to: to, // recipient email
        subject: subject, // Subject line
        text: msg, // plain text body
        html: `<b>${msg}</b>`, // html body
      },
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log(info);
          return info.response;
        }
      }
    );
  }

  public async resetPassword(to: string, subject: string) {
    const getUser = await this.userService.findByEmail(to);
    if (getUser) {
      const token = await this.authService.sing(
        { sub: getUser.id },
        this.getEnvironment("JWT_SECRET"),
        "1h"
      );
      if (token) {
        const isResolve: Promise<boolean> = new Promise((resolve, _reject) => {
          this.transport.sendMail(
            {
              from: "coderrdev@gmail.com", // verified sender email
              to: to, // recipient email
              subject: subject, // Subject line
              template: "reset-password",
              context: {
                token: token,
                date: dateFormtat(),
              },
            },
            function (error, info) {
              if (error) {
                console.log("entra en error");
                console.log(error);
                resolve(false);
              } else {
                console.log("entra en info");
                console.log(info.response);
                resolve(true);
              }
            }
          );
        });

        this.resolve = await isResolve;
      }
    }

    return null;
  }
}
