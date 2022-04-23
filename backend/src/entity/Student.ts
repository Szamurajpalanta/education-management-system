import {Entity, PrimaryColumn, Column, ManyToMany} from "typeorm";
import { Course } from "./Course";

@Entity()
export class Student {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    circle: string;

    @ManyToMany(type => Course, course => course.students)
    courses: Course[];
}