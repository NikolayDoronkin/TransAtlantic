import {MailerModule} from '@nestjs-modules/mailer';
import {Module} from '@nestjs/common';
import {MailService} from "../service/mail.service";
import {ConfigService} from "@nestjs/config";

@Module({
	imports: [
		MailerModule.forRootAsync({
			useFactory: async (config: ConfigService) => ({
				transport: {
					service: 'gmail',
					secure: false,
					port: 25,
					auth: {
						user:  config.get('EMAIL'),
						pass:   config.get('PASSWORD'),
					},
				},
				defaults: {
					from:  config.get('EMAIL'),
				},
				tls: {
					rejectUnauthorized: false
				}
			}),
			inject: [ConfigService],
		}),
	],
	providers: [MailService],
	exports: [MailService]
})
export class MailModule {}
