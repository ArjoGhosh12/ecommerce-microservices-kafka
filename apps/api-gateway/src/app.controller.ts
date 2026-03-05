import { Body, Controller, Get, Inject, Post, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';

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

  @Post('order')
  createOrder(@Body() order: any) {
    this.kafkaClient.emit('order-created', order);
    return { message: 'Order sent to Kafka', order };
  }
}