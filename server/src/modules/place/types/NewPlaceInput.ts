import { InputType, Field } from "type-graphql";

@InputType()
export class NewPlaceInput {
  @Field()
  name!: string;

  @Field()
  createdById!: string;

  @Field(() => [String], { defaultValue: [] })
  joinedUsersIds!: string[];
}
