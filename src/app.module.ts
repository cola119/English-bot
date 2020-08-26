import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordsModule } from './words/words.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

const typeOrmModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'db-server',
  port: 3306,
  username: 'develop',
  password: 'password',
  database: 'develop',
  entities: [join(__dirname, '**/**.entity{.ts,.js}')],
  synchronize: true,
});

@Module({
  imports: [WordsModule, typeOrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
