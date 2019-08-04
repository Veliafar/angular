import { Component, Input, OnInit, Optional } from '@angular/core';
import { UserInterface } from '../../../../interfaces';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  _user: UserInterface;

  @Input()
  set user(value) {
    if (value) {
      this._user = value;
    }
  }

  get user() {
    return this._user;
  }

  constructor(
    @Optional() private parent: UserComponent
  ) { }

  ngOnInit() {
    console.log(this.parent);
    this.parent.user = { ...this.user };
  }

}
