import { Field, ID, ObjectType, Int, Float } from 'type-graphql';

@ObjectType()
export class Job {
  @Field(type => ID)
  id: string;

  @Field()
  detailUrl: string;

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

  @Field(type => [Float], { nullable: true })
  location: [number, number]
}
