import {Component, OnInit, ViewChild} from '@angular/core';
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
    public dialog: MatDialog) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.getUsers();

  }
  addUser() :void {
    const dialogRef = this.dialog.open(AddUserComponent
    );
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
