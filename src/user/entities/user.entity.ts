import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../config/base.entity";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  lastname!: string;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  jobPosition?: string;

  @Column()
  numberPhone!: number;

  @Column({ nullable: true })
  streetAddress?: string;
}
