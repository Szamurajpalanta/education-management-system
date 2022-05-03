import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: Student[] = [];
  query: string = '';

  constructor(private studentService: StudentService) { }

  async ngOnInit() {
    try {
      this.students = await this.studentService.getStudents();
      console.log(this.students);
    } catch (err) {
      console.error(err);
    }
  }
  
  async search() {
    try {
      this.students = await this.studentService.searchStudents(this.query);
    } catch (err) {
      console.error(err);
    }
  }

}
