import { Component, Input, ViewChild } from '@angular/core';
import { NbDialogRef, NbStepperComponent } from '@nebular/theme';
import { ResultTableComponent } from '../../result-table/result-table/result-table.component';
import { QuestionTableComponent } from '../../question-table/question-table/question-table.component';

@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.css']
})
export class ExamResultComponent {

  @Input() data: any;
  @ViewChild('stepper') stepper!: NbStepperComponent;
  @ViewChild(ResultTableComponent) resultTableComponent!: ResultTableComponent;
  @ViewChild(QuestionTableComponent) QuestionTableComponent!: QuestionTableComponent;
  stepperIndex: number = 0;

  constructor(private dialogRef: NbDialogRef<ExamResultComponent>) { }

  stepperChange(event: any) {
    this.stepperIndex = event.index
  }

  previousStep() {
    this.stepper.previous();
  }

  nextStep() {
    this.stepper.next();
  }

  close() {
    this.dialogRef.close()
  }
}
