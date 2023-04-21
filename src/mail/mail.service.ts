import { MailerService } from "@nestjs-modules/mailer";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
    constructor(
        private _mailer: MailerService
    ){}

    async sendMail(params: mailParams) {
        const { to, cc, subject, template, context, attachments } = params;
        await this._mailer.sendMail({
            to: to,
            cc: cc,
            subject: subject,
            context: context,
            template: template,
            attachments: attachments
        })
        .then((response) => {
            throw new HttpException(response, HttpStatus.OK)
        })
        .catch((err) => {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
        })
    }

    
}