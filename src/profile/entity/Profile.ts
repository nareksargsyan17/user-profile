import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from './../../user/entity/User';

@Entity("profile")
export class Profile{
    @PrimaryGeneratedColumn()
    id : number

    @OneToOne(()=>User, { eager: true, cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    userId: number;

    @Column()
    firstName : string;

    @Column()
    lastName : string;

    @Column()
    phone : number

}