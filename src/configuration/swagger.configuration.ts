import { DocumentBuilder } from "@nestjs/swagger";

export class SwaggerConfiguration {
  public static configure() {
    return new DocumentBuilder()
      .setTitle("trans-atlantic-api")
      .setDescription("documentation for endpoints")
      .setVersion("4.0.0")
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        },
        'access-token'
      )
      .addTag("TA")
      .build();
  }
}