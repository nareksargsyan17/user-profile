import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity("files")
export class File{
    @PrimaryGeneratedColumn()
    id : number;
 
    @Column()
    src : string;
    
    @CreateDateColumn()
    createdAt : Date
    
    @Column({default: null})
    essenceId : number;
    
    @Column({default: null})
    essenceTable : string;
}