import { Teacher } from "./teacher";

export class Course {
    id: number;
    time: string;
    parent_subject: number;
    teacher: Teacher;
}