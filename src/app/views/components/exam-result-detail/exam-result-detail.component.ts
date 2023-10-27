import { Component, Input } from '@angular/core';
import { UserScoreService } from 'src/app/services/userScoreService/user-score.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-exam-result-detail',
  templateUrl: './exam-result-detail.component.html',
  styleUrls: ['./exam-result-detail.component.scss']
})
export class ExamResultDetailComponent {

  @Input() performs: any
  constructor(
    private dialogRef: NbDialogRef<ExamResultDetailComponent>,
    private userScoreService: UserScoreService) { }

  ngOnInit() {
    this.getUserScoreByCategoryid()
  }

  getUserScoreByCategoryid() {
  }

  close() {
    this.dialogRef.close('kapandi')
  }
}
