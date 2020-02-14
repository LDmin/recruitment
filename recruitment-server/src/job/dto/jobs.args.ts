import { Max, Min } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class JobsArgs {
  @Field()
  keyword: string

  @Field()
  type: string
}
