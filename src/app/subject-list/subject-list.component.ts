import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from '../models/subject';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {

  subjects: Subject[] = [];
  query: string = '';

  constructor(
    private subjectService: SubjectService,
    private formBuilder: FormBuilder
  ) { }

  async ngOnInit() {
    try {
      this.subjects = await this.subjectService.getSubjects();
      console.log(this.subjects)
    } catch (err) {
      console.error(err);
    }
  }

  newSubjectForm = this.formBuilder.group({
    name: ['', [Validators.required]],
  });

  async search() {
    try {
      this.subjects = await this.subjectService.searchSubjects(this.query);
    } catch (err) {
      console.error(err);
    }
  }

  addNewSubject() {

  }

}
