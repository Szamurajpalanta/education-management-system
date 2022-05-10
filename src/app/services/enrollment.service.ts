import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Enrollment } from '../models/enrollment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  constructor(private http: HttpClient) { }

  getEnrollments() {
    return lastValueFrom(this.http.get<Enrollment[]>('http://localhost:3000/api/enrollments'));
  }

  searchEnrollments(query: string) {
    return lastValueFrom(this.http.get<Enrollment[]>('http://localhost:3000/api/search/enrollments', {
      params: {
        search: query
      }
    }));
  }

  createEnrollment(enrollment: Enrollment) {
    return lastValueFrom(this.http.post<Enrollment>('http://localhost:3000/api/enrollments', enrollment));
  }

  updateEnrollment(enrollment: Enrollment) {
    return lastValueFrom(this.http.put<Enrollment>('http://localhost:3000/api/enrollments', enrollment));
  }

  deleteEnrollment(id: number) {
    return lastValueFrom(this.http.delete<Enrollment>(`http://localhost:3000/api/enrollments/${id}`));
  }
}
