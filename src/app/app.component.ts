import {Component, OnInit, ViewChild,ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table'
import { User } from '../app/models/user';
import { DataService } from '../app/services/data.service';
import {AddUserComponent} from '../app/users/add-user/add-user.component'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular-MatTable-CRUD';
  displayedColumns: string[] = ['name', 'username', 'email', 'phone','city','zipcode','actions'];
  dataSource : any;
  users:User[];
  constructor(private dataService: DataService,
    public dialog: MatDialog,
    private ref: ChangeDetectorRef) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.getUsers();

  }
  addUser() :void {
    const dialogRef = this.dialog.open(AddUserComponent
    );
    const sub = dialogRef.componentInstance.isUserAdded.subscribe((data: any) => {
      debugger;
       this.users.splice(0,0,data);
       this.ref.detectChanges();
       this.dataSource = this.users;
       this.dataSource = new MatTableDataSource<any>(this.users);
  });
  dialogRef.afterClosed().subscribe(result => {
   //this.refreshTable();
    });
  }
 
  getUsers():void{
    this.dataService.getUsers()
      .subscribe(serviceResult => {
          this.users = serviceResult;
          this.dataSource =  this.users;
          this.dataSource.paginator = this.paginator;
      });
  }
}
