import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-statistics-list',
  templateUrl: './statistics-list.component.html',
  styleUrls: ['./statistics-list.component.css']
})
export class StatisticsListComponent implements OnInit {

  students: Student[] = [];
  circles: string[] = [];

  constructor(
    private studentService: StudentService
  ) { }

  async ngOnInit() {
    try {
      this.students = await this.studentService.getStudents();
      this.students.forEach(student => {
        if (!this.circles.includes(student.circle)) {
          this.circles.push(student.circle);
        }
      });
      console.log(this.circles)
    } catch (err) {
      console.error(err);
    }
  }

}
