import { Max, Min } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class JobsArgs {
  @Field()
  clientId: string

  @Field()
  fetchId: string

  @Field()
  keyword: string

  @Field()
  type: string

  @Field()
  cityId: number
}
