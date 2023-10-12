import { fileParams } from '../../file_management/index'
export interface mailParams {
    to: string[],
    cc: string[],
    subject: string,
    template: string,
    context: Object,
    attachments?: fileParams[]
}