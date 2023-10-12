import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { mailService } from "./mail.service";
import { utilAddDayToDate, utilAddTimeToDate, utilCurrentDate } from "src/utils/date-time.util";

@Controller('mail')
@ApiTags('Mail')
export class MailController {
    constructor( private readonly mailService: mailService){}

    @Get()
    sendEmail() {
        return this.mailService.newMail(
            {
                to: ['saul.espinoza@martinrea.com'],
                cc: [],
                context: {
                    prueba: 'La prueba uno context',
                    prueba2: 'La prueba dos context',
                    items: [
                        { name: 'Saul', lastname: 'Espinoza'},
                        { name: 'Rogelio', lastname: 'Jasso'}
                    ]
                },
                template: 'prueba',
                subject: 'prueba desde controlador'
            },
        )
    }

    @Get('/calendar-event')
    sendCalendarEvent() {
        return this.mailService.newMeeting(
            {
                to: ['saul.espinoza@martinrea.com'],
                cc: [],
                context: {
                    prueba: 'La prueba uno context',
                    prueba2: 'La prueba dos context',
                    items: [
                        { name: 'Saul', lastname: 'Espinoza'},
                        { name: 'Rogelio', lastname: 'Jasso'}
                    ]
                },
                template: 'prueba',
                subject: 'prueba desde controlador'
            },
            {
                location: 'Oficinas de prueba',
                summary: 'Prueba de la reunion',
                start: utilCurrentDate(),
                end: utilAddTimeToDate(utilCurrentDate(), 1, 'hours'),
                organizer: { name: 'Sistemas', email: 'slp.structures.systems@martinrea.com'},
                attendees: [
                    {name: 'Saul Espinoza', email: 'saul.espinoza@martinrea.com'}
                ]
            }
        );
    }
}