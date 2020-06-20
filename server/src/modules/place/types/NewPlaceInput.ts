import { InputType, Field } from "type-graphql";

@InputType()
export class NewPlaceInput {
  @Field()
  name!: string;

  @Field()
  description!: string;
}
