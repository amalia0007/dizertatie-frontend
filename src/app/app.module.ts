import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {GameService} from './services/game.service';
import {UserService} from './services/user.service';
import {ForbiddenService} from './services/forbidden.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AdminPageComponent} from './pages/admin-page/admin-page.component';
import {DashboardPageComponent} from './pages/dashboard-page/dashboard-page.component';
import {HomepageComponent} from './pages/paginated-games/homepage.component';
import {UploadImageService} from './services/upload-image.service';
import {GrdFilterPipe} from './grd-fiter.pipe';
import {NgxPaginationModule} from 'ngx-pagination';

import {UploadGameComponent} from './admin-dashboard/upload-game/upload-game.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {GamesComponent} from './pages/dashboard-page/games/games.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {AuthenticationService} from './services/authentication.service';
import {FrontpageComponent} from './frontpage/Frontpage.component';
import {JwtInterceptor} from './security/jwt.interceptor';
import {ErrorInterceptor} from './security/error.interceptor';
import {ForbiddenComponent} from './pages/forbidden/forbidden.component';
import {DialogModule} from '@syncfusion/ej2-angular-popups';
import {DialogConfirmComponent} from './services/dialog-confirm/dialog-confirm.component';
import {ConfirmationDialogService} from './services/dialog-confirm/dialog-confirm.service';
import {NavbarComponent} from './navigation/navbar.component';
import {GameDetailsComponent} from './admin-dashboard/game-details/game-details.component';
import {GamePageComponent} from './pages/game-page/game-page.component';
import {UserGameService} from './services/user-game.service';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ModalModule} from 'ngx-bootstrap/modal';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {UsersDashboardComponent} from './admin-dashboard/users-dashboard/users-dashboard.component';
import {UserDetailsComponent} from './admin-dashboard/user-details/user-details.component';
import {RentedGamesComponent} from './pages/rented-games/rented-games.component';
import {HomepageIconComponent} from './pages/paginated-games/game-grid-icon/homepage-icon.component';
import {DialogBannedService} from './services/dialog-banned/dialog-banned.service';
import {DialogBannedComponent} from './services/dialog-banned/dialog-banned.component';
import {RentListComponent} from './pages/rent-page/rent-list.component';
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';

import {DialogEditProfileComponent} from './services/dialog-edit-profile/dialog-edit-profile.component';
import {DialogEditProfileService} from './services/dialog-edit-profile/dialog-edit-profile.service';
import {ImageCropperModule} from 'ngx-image-cropper';
import {DialogLoginComponent} from './services/dialog-login-profile/dialog-login.component';
import {DialogLoginService} from './services/dialog-login-profile/dialog-login.service';
import {DialogRegisterComponent} from './services/dialog-register-profile/dialog-register.component';
import {DialogRegisterService} from './services/dialog-register-profile/dialog-register.service';
import {DialogForgotPasswordComponent} from './services/dialog-forgot-password/dialog-forgot-password.component';
import {DialogForgotPasswordService} from './services/dialog-forgot-password/dialog-forgot-password.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {RecommendedCategoriesComponent} from './pages/recommended-categories-page/recommended-categories.component';


import {DialogActivateAccountComponent} from './services/dialog-activate-account/dialog-activate-account.component';
import {DialogActivateAccountService} from './services/dialog-activate-account/dialog-activate-account.service';
import {DropDownsModule} from '@progress/kendo-angular-dropdowns';
import {TopRatedComponent} from './pages/top-rated/top-rated.component';
import {TopRentedComponent} from './pages/top-rented-games/top-rented.component';
import {RentChartComponent} from './admin-dashboard/rent-chart/rent-chart.component';
import {GameChartComponent} from './admin-dashboard/game-chart/game-chart.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {PartnersComponent} from './pages/partners/partners.component';
import { AboutComponent } from './pages/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminPageComponent,
    DashboardPageComponent,
    HomepageComponent,
    GrdFilterPipe,
    HomepageComponent,
    UploadGameComponent,
    GamesComponent,
    FrontpageComponent,
    AdminDashboardComponent,
    HomepageIconComponent,
    ForbiddenComponent,
    DialogConfirmComponent,
    NavbarComponent,
    GameDetailsComponent,
    GamePageComponent,
    UsersDashboardComponent,
    UserDetailsComponent,
    RentedGamesComponent,
    DialogBannedComponent,
    RentListComponent,
    NotFoundPageComponent,
    RecommendedCategoriesComponent,
    DialogEditProfileComponent,
    NotFoundPageComponent,
    DialogLoginComponent,
    DialogRegisterComponent,
    DialogForgotPasswordComponent,
    DialogActivateAccountComponent,
    TopRatedComponent,
    TopRentedComponent,
    RentChartComponent,
    GameChartComponent,
    PartnersComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    DialogModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    ImageCropperModule,
    DragDropModule,
    DropDownsModule,
    MatCheckboxModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  providers: [GameService,
    ForbiddenService,
    UserService,
    ConfirmationDialogService,
    UploadImageService,
    AuthenticationService,
    UserGameService,
    DialogBannedService,
    DialogEditProfileService,
    DialogLoginService,
    DialogRegisterService,
    DialogForgotPasswordService,
    DialogActivateAccountService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  // tslint:disable-next-line:max-line-length
  entryComponents: [DialogConfirmComponent, DialogBannedComponent, DialogEditProfileComponent, DialogLoginComponent, DialogRegisterComponent, DialogForgotPasswordComponent, DialogActivateAccountComponent],
})
export class AppModule {
}
