import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
@MessagePattern('order-created')
sendOrderCreatedNotification(@Payload() data: any) {
  console.log('[Notification Service] Sending Order Created Email', data);
}

@MessagePattern('payment-succeed')
sendPaymentSucceedNotification(@Payload() data: any) {
  console.log('[Notification Service] Sending Payment Succeed Email', data);
}

}
