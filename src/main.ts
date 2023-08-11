import { NestFactory } from '@nestjs/core';
import {Logger} from "@nestjs/common"
import { AppModule } from './app.module';
import * as config from "config"
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
const serverConfig = config.get("server")
  const logger = new Logger("bootstrap")
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({origin: 
    // "http://localhost:3000"
    "https://shoppingmanager-e0qgq7z5l-jayte054.vercel.app/"
  })

// swagger configuration
  const options = new DocumentBuilder()
  .setTitle("Shopping App Manager")
  .setDescription("App designed to help people create shopping itenary and book it with stores")
  .setVersion("1.0")
  .build()

  //swagger Document
  const document = SwaggerModule.createDocument(app, options)

  //swagger UI endpoint
  SwaggerModule.setup("api", app, document)

  const port = process.env.PORT || serverConfig.port
  await app.listen(port);
  logger.log(`Application is listening on port ${port}`)
}
bootstrap();
