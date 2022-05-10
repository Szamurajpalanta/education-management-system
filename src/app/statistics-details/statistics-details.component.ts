import { Component, Input, OnInit } from '@angular/core';
import { Enrollment } from '../models/enrollment';
import { Student } from '../models/student';
import { EnrollmentService } from '../services/enrollment.service';

@Component({
  selector: 'app-statistics-details',
  templateUrl: './statistics-details.component.html',
  styleUrls: ['./statistics-details.component.css']
})
export class StatisticsDetailsComponent implements OnInit {

  @Input() students!: Student[];
  @Input() circle!: string;
  enrollments: Enrollment[] = [];

  constructor(private enrollmentService: EnrollmentService) { }

  async ngOnInit() {
    try {
      this.enrollments = await this.enrollmentService.getEnrollments();
    } catch (err) {
      console.error(err);
    }
  }

  countStudents() {
    let count = 0;
    this.students.forEach(student => {
      if (student.circle === this.circle) {
        count++;
      }
    });
    return count;
  }

  calculateAverage() {
    let temp = 0;
    let count = 0;
    this.enrollments.forEach(enrollment => {
      if (enrollment.student.circle === this.circle) {
        temp += enrollment.mark;
        count++;
      }
    });
    temp /= count;
    return temp;
  }

}
