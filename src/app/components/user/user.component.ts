import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Post } from '../../Post';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
  post: Post[];
  users = [];
  editingUser: Post;
  editing: boolean = false; 
  id: string = '';
  allUsers$: Observable<Post[]>

  dataSource = new BookDataSource(this.dataService);

  constructor(private dataService: DataService) {
  };

  ngOnInit() {
   this.cargaUsers(); 
  }

  getUser(id) {
    this.dataService.getUser(id).subscribe(data => {
      this.id = data._id;
      this.userForm.setValue({
        name: data.name,
        gender: data.gender,
        email: data.email,
        phone: data.phone
      });
    });
  }

  cargaUsers(){
    this.dataService.getData().subscribe(users => {
      this.post = users;
    });
  }


  editUser(event, user) {
    this.editingUser = user;  
    this.editing = !this.editing; 
  }

  updateUser(user) {
    this.dataService.updateUser(user._id, this.editingUser).subscribe(user=>{
      console.log("User updated");
    });
    this.editingUser = {} as Post;
    this.editing = false;
    
  }

  deleteUser(event, user){
    if(confirm('Are you sure you want to delete this user?'))
    this.dataService.deleteUser(user._id, user).subscribe(users =>{
      console.log("User deleted");
      this.cargaUsers();
    });
  }

}

export class BookDataSource extends DataSource<any> {
  constructor(private dataService: DataService) {
    super()
  }

  connect() {
    return this.dataService.getData();
  }

  disconnect() {

  }
}

