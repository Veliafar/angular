import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInterface } from '../../../../interfaces';
import { ApiService } from '../../../core/services';
import { catchError, takeUntil } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  user: UserInterface;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    const userId: number = this.activatedRoute.snapshot.params['id'];
    this.getUsers(userId);
  }

  getUsers(userId) {
    if (!userId) {
      this.toastr.error('Request error');
      return;
    }
    this.apiService
      .fetchUserById(userId)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        catchError(error => {
          this.toastr.error('Request error');
          return throwError(error);
        })
      )
      .subscribe(
        (user: UserInterface) => {
          this.user = user;
        });
  }

  back(): void {
    this.router.navigate(['./users']);
  }

  ngAfterContentInit() {
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
