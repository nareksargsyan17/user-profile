import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
@Entity("textBlock")
export class TextBlock{
    @PrimaryGeneratedColumn()
    id : number

    @Column({unique : true})
    primeName : string;

    @Column()
    name : string;

    @Column()
    text : string;

    @Column()
    group : string;

}