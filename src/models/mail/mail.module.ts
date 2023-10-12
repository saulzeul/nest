import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter";
import { mail_config } from "../../constants/mail.const";
import { MailController, mailService, } from './index';
const { service, host, port, user, password, sender } = mail_config;

@Module({
    imports: [
        MailerModule.forRootAsync({
            async useFactory() {
                return {
                    transport: {
                        service: service,
                        host: host,
                        port: port,
                        auth: {
                            user: user,
                            pass: password
                        },
                        tls: {
                            ciphers: 'SSLv3',
                            rejectUnauthorized: false,
                        }
                    },
                    defaults: {
                        from: sender
                    },
                    template: {
                        adapter: new PugAdapter(),
                        options: {
                            strict: true
                        }
                    }
                }
            }
        })
    ],
    providers: [mailService],
    controllers: [MailController]
})
export class MailModule { }