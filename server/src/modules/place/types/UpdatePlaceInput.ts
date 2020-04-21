import { InputType, Field } from "type-graphql";

/**
 * @deprecated not used for joining to places anymore
 */
@InputType()
export class UpdatePlaceInput {
  @Field()
  id!: string;

  @Field()
  joinedUserId!: string;
}
