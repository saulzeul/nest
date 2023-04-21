import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('local_files')
export class LocalFile extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    filename: string;

    @Column({ name: 'module' })
    fieldname: string;

    @Column()
    destination: string;

    @Column()
    path: string;

    @Column()
    mimetype: string;
}