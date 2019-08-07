import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent, UserDataComponent } from './components';
import { ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [UserComponent, UserDataComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [
    ToastrService
  ]
})
export class UserModule { }
