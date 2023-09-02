import {Penalty} from './Penalty';
import {Image} from './Image';
import {Company} from "./Company";

export class User {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  penalties: Penalty[];
  token?: string;
  company: Company;


  constructor(email: string, password: string, firstName: string, lastName: string, penalties: Penalty[], company: Company) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.penalties = penalties;
    this.company = company;
  }

}
