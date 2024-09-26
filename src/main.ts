import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import rTracer from "cls-rtracer";
import { AppModule } from "@src/app.module";
import { config } from "@config";
import { NestExpressApplication } from "@nestjs/platform-express";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import "cross-fetch/polyfill";
// import { customConsoleLog } from '@src/custom-logger';
import { join } from "path";

// customConsoleLog();

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        // httpsOptions: {
        //     key: fs.readFileSync(`./ssl/product/server.key`),
        //     cert: fs.readFileSync(`./ssl/product/server.crt`)
        // },
    });
    // const loggerService = app.select(LoggerModule).get(LoggerService);

    try {
        // const documentOptions = new DocumentBuilder()
        //     .setTitle(config.appTitle)
        //     .setDescription(config.appDescription)
        //     .setVersion(config.apiVersion)
        //     .build();
        // const document = SwaggerModule.createDocument(app, documentOptions);

        // app.setGlobalPrefix(config.apiVersion);
        app.useGlobalPipes(new ValidationPipe());

        app.use(rTracer.expressMiddleware());

        // added security
        app.use(helmet()); // 4 버전의 경우 무한 로딩 이슈가 발생함, 3 버전으로 사용
        app.enableCors();
        app.set('trust proxy', 1);
        // rateLimit
        app.use(
            rateLimit({
                // TODO: 각 IP에 대해서 LIMIT가 걸리는지 확인하기
                windowMs: 1000 * 60 * 60, // an hour
                max: config.rateLimitMax, // limit each IP to 100 requests per windowMs
                message:
                    "⚠️  Too many request created from this IP, please try again after an hour",
            })
        );

        app.use(
            morgan("tiny", {
                skip(req, res) {
                    return res.statusCode < 400;
                },
                // stream: loggerService.errorStream,
            })
        );

        // SwaggerModule.setup(config.swaggerPath, app, document);

        await app.listen(config.port, () => {
            !config.isProduction
                ? console.info(
                      `🚀  Server ready at http://${config.host}:${config.port}/${config.apiVersion}`,
                      { context: "BootStrap" }
                  )
                : console.info(
                      `🚀  Server is listening on port ${config.port}`,
                      { context: "BootStrap" }
                  );

            !config.isProduction &&
            console.info(
                    `🚀  Subscriptions ready at ws://${config.host}:${config.port}/${config.apiVersion}`,
                    { context: "BootStrap" }
                );
        });
    } catch (error) {
        console.error(`❌  Error starting server, ${error}`, {
            context: "BootStrap",
        });
        process.exit();
    }
}
bootstrap();
