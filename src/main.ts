import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfiguration = new DocumentBuilder()
    .setTitle("trans-atlantic-api")
    .setDescription("documentation for endpoints")
    .setVersion('4.0.0')
    .addTag('TA')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfiguration);
  SwaggerModule.setup('/api/swagger-ui/index.html', app, document);

  await app.listen(3000);
}
bootstrap();
