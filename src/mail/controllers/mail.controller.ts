import { Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http.response";
import { MailService } from "../services/mail.service";

export class MailController {
  constructor(
    private readonly mailService: MailService = new MailService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  public getMail(req: Request, res: Response) {
    try {
      const { msg, to, subject } = req.body;
      const data = this.mailService.createMail(msg, to, subject);
      if (data !== undefined) {
        console.log(data);
        this.httpResponse.Ok(res, data);
      }
    } catch (err) {
      console.error(err);
      this.httpResponse.Error(res, err);
    }
  }
  public async resetPassword(req: Request, res: Response) {
    try {
      const { to, subject } = req.body;
      const data = await this.mailService.resetPassword(to, subject);

      if ((await this.mailService.resolve) === true) {
        this.httpResponse.Ok(res, "Exito! Revisa tu casilla de mail");
      }
      if ((await this.mailService.resolve) === false) {
        this.httpResponse.NotFound(res, "No se pudo enviar el mail");
      }
      if (!data) {
        this.httpResponse.Error(
          res,
          "El mail no es valido, o no se encuentra registrado"
        );
      }
    } catch (err) {
      console.error(err);
      this.httpResponse.Error(res, err);
    }
  }
}
