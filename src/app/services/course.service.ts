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
}
