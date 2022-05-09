import {Entity, PrimaryColumn, Column, ManyToMany, OneToMany} from "typeorm";
import { Enrollment } from "./Enrollment";

@Entity()
export class Student {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    circle: string;

    @OneToMany(type => Enrollment, enrollment => enrollment.student)
    enrollments: Enrollment[];
}