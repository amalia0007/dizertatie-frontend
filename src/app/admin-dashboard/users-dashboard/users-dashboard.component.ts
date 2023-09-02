import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../model/User';
import {Subscription} from 'rxjs';
import {ResponsePageList} from '../../model/ResponsePageList';
import {UserData} from '../../model/UserData';

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.css']
})
export class UsersDashboardComponent implements OnInit {
  @Output() fullUserEventEmitter: EventEmitter<UserData> = new EventEmitter<UserData>();
  @Output() userEmitted: EventEmitter<boolean> = new EventEmitter<boolean>();
  value: any;
  users: UserData[];
  nrOfElements: any;
  p: any;
  private subscriptionInit: Subscription;
  private paginatedUsers: ResponsePageList<UserData>;
  private selectedUser: UserData;
  private subscriptionPageGridChanged: Subscription;
  private subscriptionInputSearchChanged: Subscription;

  constructor(private userService: UserService) {
  }

  initListOfUsers() {
    this.subscriptionInit = this.userService.getPaginatedUsers('id', 'ASC', '0', '5', '').subscribe(result => {
      this.paginatedUsers = result;
      this.users = this.paginatedUsers.pageList;
      this.selectedUser = this.users[0];
      this.nrOfElements = this.paginatedUsers.nrOfElements;
    });
  }

  ngOnInit() {
    this.p = 0;
    this.initListOfUsers();
  }

  inputSearchChanged() {
    this.subscriptionInputSearchChanged = this.userService.getPaginatedUsers('id', 'ASC', '0', '5', this.value).subscribe(
      p => {
        this.paginatedUsers = p;
        this.users = this.paginatedUsers.pageList;
        this.nrOfElements = this.paginatedUsers.nrOfElements;
      }
    );
  }

  pageGridChanged(event) {
    this.p = event;
    this.subscriptionPageGridChanged = this.userService.getPaginatedUsers('id', 'ASC', (this.p - 1).toString(), '5', '').subscribe(p => {
      this.paginatedUsers = p;
      this.users = this.paginatedUsers.pageList;
      this.nrOfElements = this.paginatedUsers.nrOfElements;
    });
  }

  showDetails(user: UserData) {
    this.fullUserEventEmitter.emit(user);
    this.userEmitted.emit(true);
  }
}
