import {Component, OnDestroy, OnInit} from '@angular/core';
import {GoogleMaps} from '../../services/GoogleMaps';
import {Subscription} from 'rxjs';
import {LatLng} from '../../services/LatLng';
import {AddPersonDialogComponent} from '../../modals/addPerson/add-person.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-geo',
  templateUrl: './geo.component.html',
  styleUrls: ['./geo.component.scss'],
})
export class GeoComponent implements OnInit, OnDestroy {
  lat: number;
  lng: number;

  private clickObserver: Subscription;

  constructor(
    private googleMaps: GoogleMaps,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.clickObserver = this.googleMaps.click().subscribe((latLng: LatLng) => {
      this.lat = latLng.lat;
      this.lng = latLng.lng;
    });
  }

  ngOnDestroy() {
    if (this.clickObserver) {
      this.clickObserver.unsubscribe();
      this.clickObserver = null;
    }
  }

  onAddPerson() {
    this.dialog.open(AddPersonDialogComponent, {
      width: '80%',
      data: {
        title: 'Dodaj novu osobu',
        lat: this.lat,
        lng: this.lng,
      },
    });
  }
}
