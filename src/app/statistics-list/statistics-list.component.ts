import { Component, OnInit } from '@angular/core';
import { Enrollment } from '../models/enrollment';
import { EnrollmentService } from '../services/enrollment.service';

@Component({
  selector: 'app-statistics-list',
  templateUrl: './statistics-list.component.html',
  styleUrls: ['./statistics-list.component.css']
})
export class StatisticsListComponent implements OnInit {

  enrollments: Enrollment[] = [];
  circles: string[] = [];

  constructor(
    private enrollmentService: EnrollmentService
  ) { }

  async ngOnInit() {
    try {
      this.enrollments = await this.enrollmentService.getEnrollments();
      this.enrollments.forEach(enrollment => {
        if (!this.circles.includes(enrollment.student.circle)) {
          this.circles.push(enrollment.student.circle);
        }
      });
      console.log(this.circles)
    } catch (err) {
      console.error(err);
    }
  }

}
