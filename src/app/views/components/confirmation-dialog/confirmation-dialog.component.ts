import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  message=''

  constructor(private dialogRef: NbDialogRef<ConfirmationDialogComponent>){}

  confirm(confirmed: boolean): void {
    this.dialogRef.close(confirmed); // Onay penceresini kapat ve kullanıcının yanıtını döndür
  }
}
