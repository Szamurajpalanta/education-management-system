import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne} from "typeorm";
import { Student } from "./Student";
import { Subject } from "./Subject";
import { Teacher } from "./Teacher";

@Entity()
export class Course {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    time: string;

    @ManyToOne(type => Teacher, teacher => teacher.courses)
    teacher: Teacher;

    @ManyToOne(type => Subject, subject => subject.courses)
    subject: Subject;

    @ManyToMany(type => Student, student => student.courses)
    students: Student[];
}