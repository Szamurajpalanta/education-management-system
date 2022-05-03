import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn} from "typeorm";
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

    @ManyToOne(type => Teacher, teacher => teacher.courses, { eager: true })
    teacher: Teacher;

    @ManyToOne(type => Subject, subject => subject.courses, { eager: true })
    subject: Subject;
}