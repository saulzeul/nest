import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import ical, { ICalEventStatus, ICalCalendarMethod, ICalAttendeeStatus, ICalAttendeeType, ICalAttendeeRole } from "ical-generator";
import { mailParams, IcalendarEventParam} from './index';



@Injectable()
export class mailService {
    constructor(
        private _mailer: MailerService
    ) { }

    async newMail(mailParams: mailParams) {
        const {to, cc, subject, context, template} = mailParams;
        await this._mailer.sendMail({
            to: to.map((person) => person),
            cc: cc.map((person) => person),
            subject,
            context,
            attachments: [],
            template: this.getTemplatePath(template),
        })
    }

    async newMeeting(mailParams: mailParams, eventParams: IcalendarEventParam) {
        const { to, cc, subject, template, context } = mailParams;
        await this._mailer.sendMail({
            to: to.map((person) => person),
            cc: cc.map((person) => person),
            subject,
            template: this.getTemplatePath(template),
            context,
            alternatives: [
                {
                    contentType: 'text/calendar; charset=UTF-8; method=REQUEST',
                    content: this.generateIcal(eventParams)
                }]
        })
    }

    private generateIcal(eventParams: IcalendarEventParam) {
        const { summary, location, start, end, organizer, attendees } = eventParams;
        const attendees_format = attendees.map((attendee) => {
            return {
                name: attendee.name,
                email: attendee.email,
                status: ICalAttendeeStatus.ACCEPTED,
                rsvp: true,
                type: ICalAttendeeType.INDIVIDUAL,
                role: ICalAttendeeRole.REQ
            }
        });
        const content = ical({
            method: ICalCalendarMethod.REQUEST,
            timezone: 'America/Mexico_City',
            scale: 'GREGORIAN',
            name: 'invited.ics',
            events: [
                {
                    start,
                    status: ICalEventStatus.CONFIRMED,
                    end,
                    summary,
                    organizer: {
                        name: organizer.name,
                        email: organizer.email,
                        mailto: organizer.email
                    },
                    location,
                    attendees: attendees_format
                }
            ]

        }).toString();

        return content;
    }

    private getTemplatePath(name: string) {
        return process.cwd() + "\\" + "src" + "\\" + "models" + "\\" + "mail" + "\\" + "template" + "\\" + name;
    }


}
