import { Component, Input, OnInit } from '@angular/core';
import { Enrollment } from '../models/enrollment';
import { Student } from '../models/student';
import { EnrollmentService } from '../services/enrollment.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  @Input() student!: Student;
  enrollments: Enrollment[] = [];

  constructor(private enrollmentService: EnrollmentService) { }

  async ngOnInit() {
    try {
      this.enrollments = await this.enrollmentService.searchEnrollments(this.student.id);
    } catch (err) {
      console.error(err);
    }
  }

}
