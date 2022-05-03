import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudents() {
    return lastValueFrom(this.http.get<Student[]>('http://localhost:3000/api/students'));
  }

  getStudent(id: number) {
    return lastValueFrom(this.http.get<Student>(`http://localhost:3000/api/students/${id}`));
  }

  searchStudents(query: string) {
    return lastValueFrom(this.http.get<Student[]>('http://localhost:3000/api/search/students', {
      params: {
        search: query
      }
    }));
  }

  createProduct(student: Student) {
    return lastValueFrom(this.http.post<Student>('http://localhost:3000/api/students', student));
  }

  updateProduct(student: Student) {
    return lastValueFrom(this.http.put<Student>('http://localhost:3000/api/students', student));
  }
}
