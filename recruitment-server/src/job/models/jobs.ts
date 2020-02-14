import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Job {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  company: string;

  @Field()
  address: string;

  @Field()
  pay: string

  @Field()
  updateAt: Date;

}
