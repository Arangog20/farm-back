import { Module } from '@nestjs/common';
import dbConfig from './persistence/db-config';
import { ConfigModule } from '@nestjs/config';
import { PersistenceModule } from './persistence';
import { PenModule } from './pen/pen.module';
import { AnimalModule } from './animal/animal.module';
import { RestrictionModule } from './restriction/restriction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
      envFilePath: '.env',
    }),
    PersistenceModule,
    PenModule,
    AnimalModule,
    RestrictionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
