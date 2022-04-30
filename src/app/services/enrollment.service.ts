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
}
