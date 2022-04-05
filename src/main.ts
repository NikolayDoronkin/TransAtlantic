import { NestFactory } from "@nestjs/core";
import { AppModule } from "./module/app.module";
import { SwaggerModule } from "@nestjs/swagger";
import { SwaggerConfiguration } from "./configuration/swagger.configuration";
import { ValidationPipe } from "./pipe/validation.pipe";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfiguration = SwaggerConfiguration.configure();
  const document = SwaggerModule.createDocument(app, swaggerConfiguration);

  SwaggerModule.setup("/api/swagger-ui/index.html", app, document);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

bootstrap();