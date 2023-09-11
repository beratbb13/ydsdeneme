import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastrService: NbToastrService) { }

  showToast(status: string, text: string) {
    switch (status) {
      case 'success':
        this.toastrService.success(text, status);
        break;
      case 'warning':
        this.toastrService.warning(text, status);
        break;
      case 'danger':
        this.toastrService.danger(text, status);
        break;
        defualt:
        this.toastrService.default(text, status);
        break;
    }
  }

} 
