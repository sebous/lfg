import { InputType, Field } from "type-graphql";
import { User } from "../../entity/User";

@InputType()
export class NewPlaceInput {
  @Field()
  name!: string;

  @Field()
  createdById!: string;

  @Field(() => [String], { defaultValue: [] })
  joinedUsersIds!: string[];
}
