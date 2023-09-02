import {AbstractControl} from '@angular/forms';

export class Registration {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  company: string;

  constructor(firstName: string, lastName: string, password: string, email: string, company: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.email = email;
    this.company = company;
  }
}
