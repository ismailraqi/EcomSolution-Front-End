import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/Services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {
  contactForm : FormGroup;
  formToSend :any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  public globalResponse: any;
  public alerts: Array<IAlert> = [];
  constructor(private fb : FormBuilder,private contactService : ContactService,private router :Router) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      Name:  ['', Validators.compose([Validators.required, Validators.minLength(5),Validators.maxLength(50)])],
      Email:['',Validators.compose([Validators.required,Validators.email,Validators.pattern(this.emailPattern) ])],
      Subject:['',Validators.compose([Validators.required,Validators.minLength(8),Validators.maxLength(50)])],
      Content:['']
  });
  } 
  SendContact(){
    this.formToSend = this.contactForm.value;
    console.log("clicked")
    this.contactService.SaveContact(this.formToSend)
        .subscribe((result) => {
          this.globalResponse = result;              
        },
        error => { //This is error part
          console.log(error.message);
          this.alerts.push({
            id: 2,
            type: 'danger',
            message: 'Either user name or password is incorrect.'
          });
          console.log("unsuccess");
        },
        () => {
          //  This is Success part
         // console.log(this.globalResponse);
          this.alerts.push({
            id: 1,
            type: 'success',
            message: 'Login successful. Now you can close and proceed further.',
          }); 
          console.log("success")         
          this.router.navigate(["home/one"]); 
          }
        )
  }
}
export interface IAlert {
  id: number;
  type: string;
  message: string;

}


