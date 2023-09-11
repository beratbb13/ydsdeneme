import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {

  title = "";
  message = "";

  constructor(private dialogRef: NbDialogRef<ConfirmationModalComponent>) { }

  action(type: boolean): void {
    this.dialogRef.close(type);
  }
}
