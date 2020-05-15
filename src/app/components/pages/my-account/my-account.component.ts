import { Router } from '@angular/router';
import { AuthenticationService } from './../../../Services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators, FormGroup, FormBuilder, PatternValidator } from '@angular/forms';
import { UserServiceService } from '../../../Services/user-service.service';
import { User } from '../../../modals/user.model';


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.sass']
})
 export class MyAccountComponent implements OnInit {
    userRegistrationForm : FormGroup;
    loginForm : FormGroup;
    registrationInputs : User;
    public globalResponse: any;
    public alerts: Array<IAlert> = [];
    user: User;
    hide =true;
    emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    data:any 
    isLoggedIn: boolean;
    currentUser: any;
    constructor(private router: Router,private userService: UserServiceService,private fb: FormBuilder, private authService:AuthenticationService) { }
  
    ngOnInit() {
      this.userRegistrationForm = this.fb.group({
        UserName:  ['', Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(50)])],
        Password:['',Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(50)])],
        email:['',Validators.compose([Validators.required,Validators.email,Validators.pattern(this.emailPattern)])],
        ConfirmPassword:['',Validators.required]
      });

      this.loginForm = this.fb.group({
        UserName:  ['', [Validators.required]],
        Password:['',[Validators.required]],
      });
    }
    OnRegister(data)
    {
      this.registrationInputs=this.userRegistrationForm.value;
      console.log(data)
      console.log(this.registrationInputs);
          this.userService.RegisterUser(this.registrationInputs)
              .subscribe((result) => {
                this.globalResponse = result;              
              },
              error => { //This is error part
                this.alerts.push({
                  id: 2,
                  type: 'danger',
                  message: 'Registration failed with fallowing error:'+error,
                });
              },
              () => {
                  //  This is Success part
                  this.alerts.push({
                    id: 1,
                    type: 'success',
                    message: 'Registration successful.',
                  });
                  this.router.navigate(["home/one"]); 
                  }
                )
              }
       public closeAlert(alert: IAlert) {
      const index: number = this.alerts.indexOf(alert);
      this.alerts.splice(index, 1);
    } 
    Login()
    {
    let user=this.loginForm.value;
    this.isLoggedIn=false;
    this.authService.removeToken();
    this.alerts=[];
    //console.log(user);
        this.authService.ValidateUser(user)
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
            },
            () => {
                //  This is Success part
               // console.log(this.globalResponse);
                this.authService.storeToken(this.globalResponse.access_token);  
                this.alerts.push({
                  id: 1,
                  type: 'success',
                  message: 'Login successful. Now you can close and proceed further.',
                });
                this.isLoggedIn=true;
                this.GetClaims();
                this.router.navigate(["home/one"]); 
                }
              )
    }
    GetClaims()
    {
        this.authService.getClaims()
            .subscribe((result) => {
              this.globalResponse = result;              
            },
            error => { //This is error part
              console.log(error.message);
            },
            () => {
                //  This is Success part
               // console.log(this.globalResponse );
                let a=this.globalResponse;
                this.currentUser=this.globalResponse;
                this.authService.storeRole(this.currentUser);
                }
              )
            
    } 
  }
  export interface IAlert {
    id: number;
    type: string;
    message: string;
  
  }