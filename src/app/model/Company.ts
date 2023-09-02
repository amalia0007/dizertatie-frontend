import {Injectable} from '@angular/core';

export class Company {
  id: number;
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
