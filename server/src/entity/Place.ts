import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
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

  @Field(() => [String], { nullable: true })
  @Column({ array: true, type: "varchar" })
  joinedUsersIds!: string[];

  @Field(() => User)
  @JoinColumn()
  @OneToOne(() => User)
  createdBy!: User;
}
