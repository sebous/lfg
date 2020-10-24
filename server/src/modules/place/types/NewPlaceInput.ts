import { InputType, Field } from "type-graphql";
import { GraphQLUpload } from "apollo-server-express";
import { ReadStream } from "fs";

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream(): ReadStream;
}

@InputType()
export class NewPlaceInput {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field(() => GraphQLUpload!, { nullable: true })
  imageUpload?: Promise<FileUpload>;
}
