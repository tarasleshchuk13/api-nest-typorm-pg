import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleModule } from './article/article.module'
import ormconfig from './ormconfig'
import { ProfileModule } from './profile/profile.module'
import { TagModule } from './tag/tag.module'
import { AuthMiddleware } from './user/middlewares/auth.middleware'
import { UserModule } from './user/user.module'

@Module({
    imports: [
        TypeOrmModule.forRoot(ormconfig),
        TagModule,
        UserModule,
        ArticleModule,
        ProfileModule
    ]
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes({
            path: '*',
            method: RequestMethod.ALL
        })
    }
}
