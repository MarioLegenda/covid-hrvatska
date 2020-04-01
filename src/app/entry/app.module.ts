import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './bootstrap/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {NgModule} from '@angular/core';
import {MapComponent} from '../view/map/map.component';
import {AppRoutingModule} from './app-routing.module';
import {
  MAT_DATE_FORMATS, MatButtonModule, MatCheckboxModule, MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule, MatSelectModule, MatSidenavModule,
} from '@angular/material';
import {AddPersonDialogComponent} from '../modals/addPerson/add-person.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';
import {GeoComponent} from '../view/geo/geo.component';
import {SearchDialogComponent} from '../modals/search/search.component';
import {ItemComponent} from '../modals/search/item/item.component';
import {EditPersonDialogComponent} from '../modals/editPerson/edit-person.component';
import {MenuComponent} from '../view/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MenuComponent,
    AddPersonDialogComponent,
    GeoComponent,
    SearchDialogComponent,
    ItemComponent,
    EditPersonDialogComponent,
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
    FormsModule,
    MatCheckboxModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {strict: true}},
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['D/MM/YYYY'],
        },
        display: {
          dateInput: 'D/MM/YYYY',
        },
      },
    },
  ],
  entryComponents: [
    AddPersonDialogComponent,
    SearchDialogComponent,
    EditPersonDialogComponent,
  ]
})
export class AppModule { }
