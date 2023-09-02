import {Image} from './Image';
import {Developer} from './Developer';
import {Category} from './Category';
import {Rating} from './Rating';

export class Game {
  id: number;
  idSerial: string;
  title: string;
  developers: Developer[];
  gameStudio: string;
  year: number;
  categories: Category[];
  img: Image;
  gameRatings: Rating[];
  description: string;
  averageStars: number;
  stock: number;
  rentalCount: number;


  // tslint:disable-next-line:max-line-length
  constructor(isbn: string, title: string, developers1: Developer[], gameStudio: string, year: number, categories1: Category[], img: Image, ratings: Rating[], description: string, stock: number, rentalCount: number) {
    this.idSerial = isbn;
    this.title = title;
    this.developers = developers1;
    this.gameStudio = gameStudio;
    this.year = year;
    this.categories = categories1;
    this.img = img;
    this.gameRatings = ratings;
    this.description = description;
    this.stock = stock;
    this.rentalCount = rentalCount;
  }


}
