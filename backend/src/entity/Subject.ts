import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Course } from "./Course";

@Entity()
export class Subject {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Course, course => course.subject)
    courses: Course[];
}