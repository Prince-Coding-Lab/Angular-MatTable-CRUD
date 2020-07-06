import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import { DataService } from '../../services/data.service';


@Component({
    selector: 'delete-user.component',
    templateUrl: 'delete-user.component.html',
    styleUrls: ['delete-user.component.scss']
})
export class DeleteUserComponent {

  constructor(public dialogRef: MatDialogRef<DeleteUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteUser(this.data.id);
  }
}
