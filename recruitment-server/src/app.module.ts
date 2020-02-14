import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RecipesModule } from './recipes/recipes.module';
import { JobModule } from './job/jobs.module';
import { CrawlerModule } from './crawler/crawler.module';

@Module({
  imports: [
    RecipesModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    JobModule,
    CrawlerModule,
  ],
})
export class AppModule { }
