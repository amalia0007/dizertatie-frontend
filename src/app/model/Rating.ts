export class Rating {

  id: number;
  value: number;
  description: string;
  user: any;
  date: Date;


  constructor(value: number, description: string, user: any, date: Date) {
    this.value = value;
    this.description = description;
    this.user = user;
    this.date = date;
  }
}
