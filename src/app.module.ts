import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { UserModule } from './user/user.module';
import { Logger } from './common/logger.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 1433,
      username: process.env.DB_USER || 'sa',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'UserDB',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Only for development
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    }),
    UserModule,
  ],
  providers: [Logger],
})
export class AppModule {}
