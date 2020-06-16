import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule, FormsModule }          from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { DynamicFormComponent }         from './components/dynamic-form-question-component/dynamic-form-question';
import { DynamicFormQuestionComponent } from './components/dynamic-form-question-component/dynamic-form-question/dynamic-form-question.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { DynamicFormComponent } from './components/dynamic-form-component/dynamic-form/dynamic-form.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MultiSelectComponent } from './tabsPrincipal/partidas/multi-select/multi-select.component';
import { ListFilterPipe } from './tabsPrincipal/partidas/multi-select/list-filter.pipe';

@NgModule({
  imports: [
    IonicModule.forRoot(),
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    DragDropModule
  ],
  declarations: [AppComponent],
  entryComponents: [],
  providers: [
    AngularFirestoreModule,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
