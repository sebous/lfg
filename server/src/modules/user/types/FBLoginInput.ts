import { Field, InputType } from "type-graphql";

@InputType()
export class FBLoginInput {
  @Field()
  fbId!: string;

  @Field()
  name!: string;

  @Field()
  accessToken!: string;

  @Field({ nullable: true })
  avatar?: string;
}
