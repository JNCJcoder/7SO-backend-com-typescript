import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    nullable: false,
  })
  author: string;

  @Column({
    nullable: true,
  })
  place: string;

  @Column({
    nullable: false,
  })
  descriptions: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  hashtags: string;

  @Column({
    nullable: false,
  })
  image: string;

  @Column({
    default: 0,
  })
  likes: number;
}
