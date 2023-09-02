export class Image {
  id: number;
  name: string;
  type: string;
  pic: any;


  constructor(name: string, type: string, pic: any) {
    this.name = name;
    this.type = type;
    this.pic = pic;
  }
}
