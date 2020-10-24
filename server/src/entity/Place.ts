import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  UpdateDateColumn,
  CreateDateColumn,
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

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column("bytea", { nullable: true, name: "Image" })
  image?: Buffer;

  // joined entities
  @Field(() => User)
  @ManyToOne(() => User, { eager: true })
  owner!: User;

  // TODO: this should have default value not be nullable field
  @Field(() => [User], { nullable: true })
  @ManyToMany(
    () => User,
    user => user.placesJoined,
    { eager: true }
  )
  @JoinTable()
  joinedUsers!: User[];

  // generated

  @UpdateDateColumn()
  updatedDate!: Date;

  @CreateDateColumn()
  createdDate!: Date;
}
