import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee Service Portal';
   data=[];
  employeedata={
    id:"",
    firstName: '',
   lastName: "",
   email: "",
   salary: "",
   age: "",
   gender:""

   }
  user: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  
 
  ngOnInit() {

    this.user = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: ['', Validators.required],
      salary: [''],
      age: [''],
      gender: ['']
    })
  }

  onCreate() {
    const data = {
      firstName: this.user.get('firstName').value,
      lastName: this.user.get('lastName').value,
      age: this.user.get('age').value,
      email: this.user.get('email').value,
      salary: this.user.get('salary').value,

      gender: this.user.get('gender').value,

    }
    const url = 'http://localhost:3000/employees/create';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'

      })
    }


    const jsondata = JSON.stringify(data);

   
    this.http.post<any>(url, jsondata, httpOptions).subscribe(response => {
     
      //console.log(response);
    })
  }


  onLoad() {
    const url = 'http://localhost:3000/employees';
    this.http.get(url).subscribe((response:any) => {

      

    //this.data[]=response;
     this.employeedata=response.map((element,index)=>{
        return{
          id:response[index].id,
          firstName:response[index].firstName,
          lastName:response[index].lastName,
          email: response[index].email,
          salary: response[index].salary,
          age: response[index].age,
          gender:response[index].gender
        }
     });

     //console.log(response[i]);
      

    })

    this.user.patchValue(
      {
        firstName:this.employeedata[0].firstName,
        lastName: this.employeedata[0].lastName,
        email: this.employeedata[0].email,
        salary: this.employeedata[0].salary,
        age: this.employeedata[0].age,
        gender: this.employeedata[0].gender,
      });
  }


}
