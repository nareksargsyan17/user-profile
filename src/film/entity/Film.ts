import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
@Entity("film")
export class Film{
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string;

    @Column()
    text : string;

}