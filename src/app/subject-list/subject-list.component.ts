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
  subjectName: string = '';
  query: string = '';
  showStatusMessage: boolean = false;
  success: boolean = false;
  statusMessage = '';
  newSubject: Subject = {
    id: 0,
    name: ''
  }

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

  async addNewSubject() {
    this.statusMessage = '';
    this.showStatusMessage = true;

    this.newSubject.id = this.subjectService.getLowestAvailableId(await this.subjectService.getSubjects());
    this.newSubject.name = this.subjectName;

    try {
      await this.subjectService.createSubject(this.newSubject);
      this.success = true;
      this.statusMessage = 'Új tantárgy jött létre a következő megnevezéssel: ' + this.newSubject.name;      
    } catch (err: any) {
      this.statusMessage = err.error.message;
      this.success = false;
    }
  }

}
