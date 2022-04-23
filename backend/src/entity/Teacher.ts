import {Entity, PrimaryColumn, Column, OneToMany} from "typeorm";
import { Course } from "./Course";

@Entity()
export class Teacher {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    department: string;

    @OneToMany(type => Course, course => course.teacher)
    courses: Course[];
}