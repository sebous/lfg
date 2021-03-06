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

  @Field()
  @Column()
  description!: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @Field(() => String, { nullable: true })
  image() {
    if (!this.imageUrl) return;
    return `/uploads/${this.imageUrl}`;
  }

  // joined entities
  @Field(() => User)
  @ManyToOne(() => User, { eager: true })
  owner!: User;

  // TODO: this should have default value not be nullable field
  @Field(() => [User], { nullable: true })
  @ManyToMany(
    () => User,
    user => user.placesJoined,
    { eager: true, cascade: true }
  )
  @JoinTable()
  joinedUsers!: User[];

  // generated

  @UpdateDateColumn()
  updatedDate!: Date;

  @CreateDateColumn()
  createdDate!: Date;
}
