import { Injectable } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ComponentType } from '@angular/cdk/portal';
import { ConfirmationModalComponent } from 'src/app/views/components/confirmationModal/confirmation-modal/confirmation-modal.component';
import { TextModalComponent } from 'src/app/views/components/textModal/text-modal/text-modal.component';
import { ExamResultDetailComponent } from 'src/app/views/components/exam-result-detail/exam-result-detail.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private nbDialogService: NbDialogService) { }

  openModal(component: ComponentType<any>, hasBackdrop: boolean, hasScroll: boolean, customclassName?: string, data?: any) {

    const dialogRef = this.nbDialogService.open(component, {
      hasBackdrop: hasBackdrop,
      hasScroll: hasScroll,
      dialogClass: customclassName,
      context: { data: data }
    });
    return dialogRef;
  }

  openConfirmationModal(title: string, message: string) {
    const dialogRef = this.nbDialogService.open(ConfirmationModalComponent, {
      context: {
        title: title,
        message: message
      }
    })
    return dialogRef;
  }

  openTextModal(title: string, message: string) {
    const dialogRef = this.nbDialogService.open(TextModalComponent, {
      context: {
        title: title,
        message: message
      }
    })
    return dialogRef;
  }

  openExamResultDetailModal(user_id: string, category_id: string) {
    const dialogRef = this.nbDialogService.open(ExamResultDetailComponent, {
      context: {
        user_id: user_id,
        category_id: category_id
      }
    })
    return dialogRef;
  }

}
