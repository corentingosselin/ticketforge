import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import {
  EventResponse,
  TicketResponse,
} from '@ticketforge/shared/api-interfaces';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  private readonly template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ticket Confirmation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
      }
      .title {
        font-size: 24px;
        margin-bottom: 10px;
      }
      .event-info {
        margin-bottom: 20px;
      }
      .event-info span {
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1 class="title">Your TicketForge Confirmation</h1>
      <p>Thank you for purchasing a ticket from TicketForge!</p>

      <p>Here is the information about your ticket:</p>
      
      <div class="event-info">
        <p><span>Event Name:</span> {{event.name}}</p>
        <p><span>City:</span> {{event.city}}</p>
        <p><span>Description:</span> {{event.description}}</p>
        <p><span>Date:</span> {{event.date}}</p>
      </div>
  
      <div class="ticket-info">
        <p><span>Ticket Quantity:</span> {{ticket.quantity}}</p>
        <p><span>Purchased Unit Price:</span> {{ticket.purchasedUnitPrice}}</p>
        <p><span>Total Amount:</span> {{ticketTotal}}</p>
      </div>
  
      <p>If you have any questions or concerns, please contact our support team.</p>
      <p>Enjoy the event!</p>
      <p>TicketForge Team</p>
    </div>
  </body>
  </html>
`;

  async sendEmail(
    userEmail: string,
    event: EventResponse,
    ticket: TicketResponse
  ): Promise<void> {
    const placeholders = {
      '{{event.name}}': event.name,
      '{{event.city}}': event.city,
      '{{event.description}}': event.description,
      '{{event.date}}': event.date,
      '{{ticket.quantity}}': ticket.quantity,
      '{{ticket.purchasedUnitPrice}}': ticket.purchasedUnitPrice,
      '{{ticketTotal}}': ticket.quantity * ticket.purchasedUnitPrice,
    };

    const html = this.template.replace(/{{[^{}]+}}/g, (match) => {
      return placeholders[match] || '';
    });

    await this.mailerService.sendMail({
      to: userEmail,
      subject: 'Your ticket has been forged!',
      text: 'Thank you for buying a ticket from TicketForge!',
      html,
    });
  }
}
