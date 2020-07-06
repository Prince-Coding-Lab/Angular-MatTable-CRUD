import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject, Input, Output, EventEmitter, } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../models/user';
import { DataService } from '../../services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'edit-user.component',
    templateUrl: 'edit-user.component.html',
    styleUrls: ['edit-user.component.scss']
})

export class EditUserComponent implements OnInit {
    editUserForm: FormGroup;
    user: User;
    @Output() isUserUpdated = new EventEmitter();
    constructor(public dialogRef: MatDialogRef<EditUserComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private dataService: DataService,
        private _snackBar: MatSnackBar
    ) { }

    ngOnInit() {

        this.buildForm();
        this.getUser(this.data.id);
    }
    buildForm() {
        this.editUserForm = this.fb.group({
            name: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', Validators.required],
            phone: ['', Validators.required],
            address: this.fb.group({ // make a nested group
                city: ['', Validators.required],
                zipcode: ['', Validators.required],
            }),
        });
    }
    public getUser(id: number): void {
        this.dataService.getUser(id)
            .subscribe(serviceResult => {
                this.editUserForm.patchValue(serviceResult);
            });
    }
    public updateUser(): void {
        this.user = Object.assign({}, this.editUserForm.value);
        this.dataService.updateUser(this.data.id, this.user)
            .subscribe(serviceResult => {
                this.isUserUpdated.emit(this.user);
                this.dialogRef.close();
                this._snackBar.open('User updated succesfully.', 'updated', {
                    duration: 2000,
                  });

            });
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
}
