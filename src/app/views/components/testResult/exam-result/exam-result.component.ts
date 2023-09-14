import { Component, Input } from '@angular/core';
import { NbGlobalPhysicalPosition, NbDialogRef, NbStepperComponent } from '@nebular/theme';

@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.css']
})
export class ExamResultComponent {

  @Input() result: string = '';

  constructor(private dialogRef: NbDialogRef<ExamResultComponent>) { }

  close() {
    this.dialogRef.close()
  }
}
