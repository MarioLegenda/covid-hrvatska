import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './bootstrap/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {NgModule} from '@angular/core';
import {MapComponent} from '../view/map/map.component';
import {AppRoutingModule} from './app-routing.module';
import {
  MAT_DATE_FORMATS, MatButtonModule, MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule, MatSelectModule, MatSidenavModule,
} from '@angular/material';
import {MenuComponent} from '../view/shared/menu/menu.component';
import {AddPersonDialogComponent} from '../modals/addPerson/add-person.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MenuComponent,
    AddPersonDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatDialogModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatMomentDateModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {strict: true}},
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['l', 'LL'],
        },
        display: {
          dateInput: 'DD/MM/YYYY',
        },
      },
    },
  ],
  entryComponents: [
    AddPersonDialogComponent,
  ]
})
export class AppModule { }
