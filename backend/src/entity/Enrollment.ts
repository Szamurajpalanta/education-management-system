import {Entity, PrimaryColumn, Column, ManyToOne} from "typeorm";
import { Course } from "./Course";
import { Student } from "./Student";

@Entity()
export class Enrollment {

    @PrimaryColumn()
    id: number;

    @ManyToOne(type => Course, course => course.enrollments, { eager: true })
    course: Course;

    @ManyToOne(type => Student, student => student.enrollments, { eager: true })
    student: Student;

    @Column({ nullable: true })
    mark: number;
}