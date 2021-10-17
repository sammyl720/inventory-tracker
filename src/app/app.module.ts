import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CommonModule } from '@angular/common';
import { AccessFormComponent } from './access-form/access-form.component';
import { ToastComponent } from './components/toast/toast.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { ProductListComponent } from './components/product-list/product-list/product-list.component';
import { AuthInterceptor } from './interceptors/auth-interceptor/auth-interceptor';
import { ModalComponent } from './components/modal/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccessFormComponent,
    ToastComponent,
    UserDashboardComponent,
    ProductListComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
