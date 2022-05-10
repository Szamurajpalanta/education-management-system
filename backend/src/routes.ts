import * as express from 'express';
import { CourseController } from './controller/course.controller';
import { EnrollmentController } from './controller/enrollment.controller';
import { StudentController } from './controller/student.controller';
import { SubjectController } from './controller/subject.controller';
import { TeacherController } from './controller/teacher.controller';

export function getRoutes() {
    const router = express.Router();

    const courseCtrl = new CourseController();
    router.get('/api/courses', courseCtrl.getAll);
    router.get('/api/courses/:id', courseCtrl.getOne);
    router.post('/api/courses', courseCtrl.create);
    router.put('/api/courses', courseCtrl.update);
    router.delete('/api/courses/:id', courseCtrl.delete);

    const studentCtrl = new StudentController();
    router.get('/api/students', studentCtrl.getAll);
    router.get('/api/students/:id', studentCtrl.getOne);
    router.get('/api/search/students', studentCtrl.search);
    router.post('/api/students', studentCtrl.create);
    router.put('/api/students', studentCtrl.update);
    router.delete('/api/students/:id', studentCtrl.delete);

    const subjectCtrl = new SubjectController();
    router.get('/api/subjects', subjectCtrl.getAll);
    router.get('/api/subjects/:id', subjectCtrl.getOne);
    router.post('/api/subjects', subjectCtrl.create);
    router.put('/api/subjects', subjectCtrl.update);
    router.delete('/api/subjects/:id', subjectCtrl.delete);

    const teacherCtrl = new TeacherController();
    router.get('/api/teachers', teacherCtrl.getAll);
    router.get('/api/teachers/:id', teacherCtrl.getOne);
    router.post('/api/teachers', teacherCtrl.create);
    router.put('/api/teachers', teacherCtrl.update);
    router.delete('/api/teachers/:id', teacherCtrl.delete);

    const enrollmentCtrl = new EnrollmentController();
    router.get('/api/enrollments', enrollmentCtrl.getAll);
    router.get('/api/enrollments/:id', enrollmentCtrl.getOne);
    router.get('/api/search/enrollments', enrollmentCtrl.search);
    router.post('/api/enrollments', enrollmentCtrl.create);
    router.put('/api/enrollments', enrollmentCtrl.update);
    router.delete('/api/enrollments/:id', enrollmentCtrl.delete);

    return router;
}