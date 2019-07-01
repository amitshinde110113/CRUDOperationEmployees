import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee Service Portal';
  data = [];
  size; btnNext = true;
  btnPrevious = true;
  btnUpdate = true;
  i = -1;
  employeedata = {
    id: "",
    firstName: '',
    lastName: "",
    email: "",
    salary: "",
    age: "",
    gender: ""

  }
  user: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) { }


  ngOnInit() {

    this.user = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      salary: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['']
    })

    // this.propertySelection();
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
    if (data.firstName == '' || data.lastName == '' || data.email == '' || data.salary == '' || data.gender == '') {
      window.alert("Please enter data before submit")
    } else {


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
  }
  displayValues() {
    this.user.patchValue(
      {
        firstName: this.employeedata[this.i].firstName,
        lastName: this.employeedata[this.i].lastName,
        email: this.employeedata[this.i].email,
        salary: this.employeedata[this.i].salary,
        age: this.employeedata[this.i].age,
        gender: this.employeedata[this.i].gender,
      });

  }

  onLoad() {
    const url = 'http://localhost:3000/employees';
    this.http.get(url).subscribe((response: any) => {

      this.i = 0;
      this.btnUpdate = false;

      console.log(response);
      this.employeedata = response.map((element, index) => {
        return {
          id: response[index]._id,
          firstName: response[index].firstName,
          lastName: response[index].lastName,
          email: response[index].email,
          salary: response[index].salary,
          age: response[index].age,
          gender: response[index].gender
        }
      });
      this.size = response.length;
      if (this.size > 0) {
        this.btnNext = false;
      }
      console.log(response);

      this.user.patchValue(
        {
          firstName: this.employeedata[0].firstName,
          lastName: this.employeedata[0].lastName,
          email: this.employeedata[0].email,
          salary: this.employeedata[0].salary,
          age: this.employeedata[0].age,
          gender: this.employeedata[0].gender,
        });

    })

  }
  onNext() {
    if (this.i < this.size - 1) {
      this.i++;
      this.displayValues();

      console.log("onNext  ", this.i);
    }
    else {
      this.btnNext = true;
    }
    if (this.i > 0) {
      this.btnPrevious = false;
    }


  }
  onPrevious() {
;
    if (this.i >= 0) {
      if (this.i !== 0) {
        this.i--;
      } else if (this.i === 0) {
        this.btnPrevious = true;
      }

      console.log("onPrevious  ", this.i);
      this.displayValues();



    }

  }
  onDelete() {
    const url = 'http://localhost:3000/employees/delete/'
    this.http.delete<any>(url + this.employeedata[this.i].id).subscribe(response => {
      console.log(response);
    });



  }
  onUpdate() {



    const data = [
      { propName: 'firstName', value: this.user.get('firstName').value },
      { propName: 'lastName', value: this.user.get('lastName').value },
      { propName: 'age', value: this.user.get('age').value },
      { propName: 'email', value: this.user.get('email').value },
      { propName: 'salary', value: this.user.get('salary').value },

      { propName: 'gender', value: this.user.get('gender').value }

    ]
    const url = 'http://localhost:3000/employees/update/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'

      })
    }


    const jsondata = JSON.stringify(data);


    this.http.patch<any>(url + this.employeedata[this.i].id, jsondata, httpOptions).subscribe(response => {

      console.log(response);
    })















  }

}
