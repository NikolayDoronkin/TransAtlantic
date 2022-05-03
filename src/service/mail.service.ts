import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {

	constructor(private readonly mailerService: MailerService) {}

	async sendEmail(to: string, subject: string, password: string) {
		await this.mailerService
			.sendMail({
				to: to,
				subject: subject,
				text: password
			});
	}
}