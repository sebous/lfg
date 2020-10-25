import { InputType, Field } from "type-graphql";
import { GraphQLUpload } from "apollo-server-express";
import { FileUpload } from "graphql-upload";

@InputType()
export class NewPlaceInput {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field(() => GraphQLUpload!, { nullable: true })
  imageUpload?: Promise<FileUpload>;
}
