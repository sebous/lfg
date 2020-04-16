import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Field, ObjectType, ID } from "type-graphql";
import { Place } from "./Place";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  username!: string;

  @Field()
  @Column({ default: false })
  queuing!: boolean;

  @Field(() => [Place])
  @OneToMany(
    () => Place,
    place => place.createdBy
  )
  places!: Place[];
}
