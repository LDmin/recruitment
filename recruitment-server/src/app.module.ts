import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RecipesModule } from './recipes/recipes.module';
import { JobModule } from './job/jobs.module';
import { CrawlerModule } from './crawler/crawler.module';
import { PubSubModule } from './pub-sub/pub-sub.module';

@Module({
  imports: [
    RecipesModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      context: async (integrationContext) => {
        return ({
          req: integrationContext.req
        })
      },
    }),
    JobModule,
    CrawlerModule,
    PubSubModule,
  ],
})
export class AppModule { }
