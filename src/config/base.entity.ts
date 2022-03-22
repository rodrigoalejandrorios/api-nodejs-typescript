import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn({
    name: "created_ad",
    type: "timestamp",
  })
  createdAd!: Date;

  @UpdateDateColumn({
    name: "updated_ad",
    type: "timestamp",
  })
  updatedAt!: Date;
}

//id
//created_ad
//updated_ad
