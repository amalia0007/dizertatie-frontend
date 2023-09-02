import {Component, OnInit} from '@angular/core';
import {Company} from '../../model/Company';
import {PartnersService} from '../../services/partners.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {

  companies: Company[];

  constructor(private partnersService: PartnersService) {
    this.companies = [];
  }

  ngOnInit(): void {
    this.partnersService.getAll().subscribe((data: Company[]) => {
      console.log(data);
      this.companies = data;
    });
  }

}
