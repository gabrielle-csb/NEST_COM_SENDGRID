import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { SendEmailInterface } from '../interface/send-email.interface';

@Injectable()
export class SendgridService {
  constructor(private readonly httpService: HttpService) {}

  async sendEmail(data: SendEmailInterface): Promise<boolean> {
    const url = 'https://api.sendgrid.com/v3/mail/send';
    const config = {
      headers: {
        Authorization: 'Bearer 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',
      },
    };
    const response = await lastValueFrom(this.httpService.post(url, data, config));
    console.log(response.data);
    return response.status === HttpStatus.ACCEPTED;
  }
}
