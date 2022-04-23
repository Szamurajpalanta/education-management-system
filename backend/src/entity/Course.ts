import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable, OneToMany} from "typeorm";
import { Enrollment } from "./Enrollment";
import { Subject } from "./Subject";
import { Teacher } from "./Teacher";

@Entity()
export class Course {

    @OneToMany(type => Enrollment, enrollment => enrollment.course)
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    time: string;

    @ManyToOne(type => Teacher, teacher => teacher.courses)
    teacher: Teacher;

    @ManyToOne(type => Subject, subject => subject.courses)
    subject: Subject;
}