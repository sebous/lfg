import { InputType, Field } from "type-graphql";

@InputType()
export class UpdatePlaceInput {
  @Field()
  id!: string;

  @Field(() => [String], { defaultValue: [] })
  joinedUsersIds!: string[];
}
