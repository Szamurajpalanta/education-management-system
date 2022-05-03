import {Entity, PrimaryColumn, Column, ManyToOne} from "typeorm";
import { Course } from "./Course";
import { Student } from "./Student";

@Entity()
export class Enrollment {

    @PrimaryColumn()
    id: number;

    @ManyToOne(type => Course, course => course.id, { eager: true })
    course: Course;

    @ManyToOne(type => Student, student => student.id, { eager: true })
    student: Student;

    @Column()
    mark: number;
}