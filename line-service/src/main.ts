import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['192.168.3.7:32790', '192.168.3.7:32791'],
        },
      },
    },
  );
  app.listen(() => console.log('line-service is listening'));
}
bootstrap();
