import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("todo")
export class Todo extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;
}