import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit {

  constructor(
    private readonly appService: AppService,

    @Inject('KAFKA_SERVICE')
    private readonly kafkaClient: ClientKafka
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('order-created')
  handleOrderCreated(@Payload() order: any) {
    console.log('[Order-service] received new order:', order);

    // simulate order processing
    this.kafkaClient.emit('process-payment', order);
  }
}