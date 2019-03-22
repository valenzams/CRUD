import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';

import { Post } from 'src/app/Post';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  dataSaved = false;
  userForm: FormGroup;
  users: Post[];

  constructor(private formBuilder: FormBuilder, private dataService: DataService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
  }

  all(){
    this.onFormSubmit();
    this.showDiv();
  }

  showDiv() {
    document.getElementById('infoNewUser').style.display = "block";
 }

  onFormSubmit() {

    this.dataSaved = false;
    let post = this.userForm.value;
    this.dataService.getData().subscribe(users => {
      this.createUser(post);
    });
    this.userForm.reset();
  }

  createUser(post: Post) {
    this.dataService.addData(post).subscribe(user => {
        this.users = user.data;
        this.dataSaved = true;
      },
      err => {
        console.log(err);
      }
    );
  }

  get name() {
    return this.userForm.get('name');
  }
  get gender() {
    return this.userForm.get('gender');
  }
  get email() {
    return this.userForm.get('email');
  }

  get phone() {
    return this.userForm.get('phone');
  }

  saveUser() {
    let user = {
      name: this.name.value, gender: this.gender.value,
      email: this.email.value, phone: this.phone.value
    };
    this.dataService.addData(user).subscribe(res => {
        alert("User created!");
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          //A client-side or network error occurred.				 
          console.log('An error occurred:', err.error.message);
        } else {
          //Backend returns unsuccessful response codes such as 404, 500 etc.				 
          console.log('Backend returned status code: ', err.status);
          console.log('Response body:', err.error);
        }
      }
    );
    this.saveUser();
    
  }


 
















}
