import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { map, catchError, takeUntil } from 'rxjs/operators';
import { UserInterface } from '../../../../interfaces';
import { ApiService } from '../../../core/services';
import { throwError, Subject } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  displayedColumns = ['first_name', 'last_name', 'email'];
  userList: any[] = [];
  pagesCount: number;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: ApiService) {
  }

  ngOnInit() {
    this.activatedRoute.data.pipe(
      map(data => {
        return data.users
      })
    )
    .subscribe((users: UserInterface[]) => {
      this.userList = users;
    });

    this.activatedRoute.data.pipe(
      map(data => data.paginationInfo)
    )
    .subscribe(paginationInfo => {
      this.pagesCount = paginationInfo.total;
    })
  }

  pageChanged(event: PageEvent): void {
    let page: number = event.pageIndex + 1;
    this.router.navigate(['./'], { queryParams: { page } });
    this.getPagedUsers(page);
  }

  userSelected(user: UserInterface): void {
    this.router.navigate(['./user', user.id]);
  }

  getPagedUsers(page) {
    if (!page) {
      return;
    }
    this.userService
      .fetchUsers(page)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        catchError(error => {
          // this.toastr.error(
          //     this.i18next.transform('error:baseError.requestError')
          // );
          return throwError(error);
        })
      )
      .subscribe((pagedUserList: UserInterface[]) => {
        this.userList = Object.assign(pagedUserList, {});
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
