import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter";
import { mail_config } from "../constants/mail.const";
import { MailService } from "./mail.service";
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
                        dir: process.cwd() + '/templates/',
                        options: {
                            strict: true
                        }
                    }
                }
            }
        })
    ],
    providers: [MailService]
})
export class MailModule { }