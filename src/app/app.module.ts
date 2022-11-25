import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';


//Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';


//Spezial
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { AngularImageViewerModule } from "@hreimer/angular-image-viewer";


//Firebase
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire/compat';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';

//Component
import { AppComponent } from './app.component';
import { LoginComponent } from './auth-components/login/login.component';
import { RegisterComponent } from './auth-components/register/register.component';
import { MainComponent } from './main/main.component';
import { ChannelsMenuComponent } from './channels-menu/channels-menu.component';
import { HeaderToolbarComponent } from './header-toolbar/header-toolbar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChatComponent } from './chat-components/chat/chat.component';
import { ChatFieldComponent } from './shared/chat-field/chat-field.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { RemoveImgDialogComponent } from './remove-img-dialog/remove-img-dialog.component';
import { AdjustStatusComponent } from './adjust-status/adjust-status.component';
import { ResetPasswordComponent } from './auth-components/reset-password/reset-password.component';
import { InputComponent } from './shared/input/input.component';
import { ThreadContainerComponent } from './chat-components/thread/t/thread.component';
import { DialogImgComponent } from './shared/dialog-img/dialog-img.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    ChannelsMenuComponent,
    HeaderToolbarComponent,
    UserProfileComponent,
    ChatComponent,
    ChatFieldComponent,
    EditUserDialogComponent,
    RemoveImgDialogComponent,
    AdjustStatusComponent,
    ResetPasswordComponent,
    ThreadContainerComponent,
    DialogImgComponent,
    InputComponent
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSelectModule,
    MatDialogModule,
    PickerModule,
    FormsModule,
    HttpClientModule,
    AngularImageViewerModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAnalytics(() => getAnalytics()),
    provideDatabase(() => getDatabase()),
  ],
  providers: [
    ScreenTrackingService, UserTrackingService
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
