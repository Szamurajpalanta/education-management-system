import { Course } from "./course";

export class Teacher {
    id!: string;
    name!: string;
    department!: string;
    courses: Course[] = [];
}