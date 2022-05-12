import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getCourses() {
    return lastValueFrom(this.http.get<Course[]>('http://localhost:3000/api/courses'));
  }

  searchCourses(query: string) {
    return lastValueFrom(this.http.get<Course[]>('http://localhost:3000/api/search/courses', {
      params: {
        search: query
      }
    }));
  }

  createCourse(course: Course) {
    return lastValueFrom(this.http.post<Course>('http://localhost:3000/api/courses', course));
  }

  updateCourse(course: Course) {
    return lastValueFrom(this.http.put<Course>('http://localhost:3000/api/courses', course));
  }

  deleteCourse(id: number) {
    return lastValueFrom(this.http.delete<Course>(`http://localhost:3000/api/courses/${id}`));
  }

  getLowestAvailableId(courses: Course[]): number {
    let i = 0;
    courses.forEach(course => {
      if(courses.indexOf(course) == -1) {
        return i;
      }
      i++;
    });
    return courses[courses.length - 1].id + 1;
  }
}
