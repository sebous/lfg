import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Place extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field(() => [String])
  @Column({ array: true, type: "varchar" })
  joinedUsersIds!: string[];

  @Field(() => User)
  @ManyToOne(
    () => User,
    user => user.places
  )
  createdBy!: User;
}
