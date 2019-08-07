import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ApiService, PaginationApiService } from './services';
import { ToastrService } from 'ngx-toastr';

@NgModule({
  imports: [
    HttpModule
  ],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    console.log('CoreModule created');
    return {
      ngModule: CoreModule,
      providers: [
        ToastrService,
        ApiService,
        PaginationApiService
      ]
    }
  }
}
