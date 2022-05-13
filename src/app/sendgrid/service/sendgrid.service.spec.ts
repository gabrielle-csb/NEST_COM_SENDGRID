import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { SendEmailInterface } from '../interface/send-email.interface';
import { SendgridService } from './sendgrid.service';

describe('SendgridService', () => {
  let sendgridService: SendgridService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendgridService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    sendgridService = module.get<SendgridService>(SendgridService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(sendgridService).toBeDefined();
    expect(httpService).toBeDefined();
  });

  describe('sendEmail', () => {
    it('should send an email with sucess', async () => {
      //Arrange
      const data: SendEmailInterface = {
        personalizations: [
          {
            to: [
              {
                name: 'Gabrielle',
                email: 'gabrielle@email.com',
              },
            ],
          },
        ],
        from: {
          email: 'gabriellecrislayne.dev@gmail.com',
          name: 'Gabrielle Crislayne',
        },
        reply_to: {
          name: 'Gabrielle Barboza',
          email: 'gabrielle_crislayne@hotmail.com',
        },
        subject: 'Sua fatura chegou!',
        content: [
          {
            type: 'text/html',
            value: '<p>Sua fatura chegou!</p>',
          },
        ],
      };
      jest
        .spyOn(httpService, 'post')
        .mockReturnValueOnce(of({ status: 202, statusText: 'ACCEPTED', config: {}, headers: {}, data: '' }));
      //Act
      const result = await sendgridService.sendEmail(data);
      //Assert
      expect(result).toBeTruthy();
      expect(httpService.post).toBeCalledTimes(1);
    });
  });
});
