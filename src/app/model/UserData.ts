import {Image} from './Image';
import {Company} from './Company';

export class UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  img: Image;
  penalties: any[];
  roles: any;
  enabled: boolean;
  admin: boolean;
  banned: boolean;
  banUntil: Date;
  categories: any[];
  skipped: boolean;
  company: Company;
}
