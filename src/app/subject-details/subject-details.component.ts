import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../models/course';
import { Subject } from '../models/subject';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.css']
})
export class SubjectDetailsComponent implements OnInit {

  @Input() subject!: Subject;
  courses: Course[] = [];

  constructor(private courseService: CourseService) { }

  async ngOnInit() {
    try {
      this.courses = await this.courseService.getCourses();
      console.log(this.courses);
    } catch (err) {
      console.error(err);
    }
  }

}
