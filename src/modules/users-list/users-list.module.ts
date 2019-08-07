import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, MatTableModule } from '@angular/material';
import { UsersResolver, PaginationResolver } from './resolvers';
import { UsersListRoutingModule } from './users-list-routing.module';
import { UsersListComponent } from './components';
import { ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [UsersListComponent],
  imports: [
    CommonModule,    
    UsersListRoutingModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [
    ToastrService,
    UsersResolver,
    PaginationResolver
  ]
})
export class UsersListModule { }
