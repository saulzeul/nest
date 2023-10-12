export interface IcalendarEventParam {
    summary: string,
    location: string,
    start: Date | string,
    end: Date | string,
    organizer: { name: string, email: string },
    attendees: [{ name: string, email: string }]
}