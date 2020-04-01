import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Person} from '../../../model/Person';
import {GoogleMaps} from '../../../services/GoogleMaps';
import {LatLng} from '../../../services/LatLng';
import {HealthCheck} from '../../../model/HealthCheck';

@Component({
  selector: 'app-person-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input('person') person: Person;
  @Output('onMapSelected') onMapSelected = new EventEmitter();
  @Output('onEditPerson') onEditPerson = new EventEmitter();

  selected: boolean = false;

  constructor(
    private googleMaps: GoogleMaps,
  ) {}

  onSelect() {
    this.selected = !this.selected;
  }

  onPinMap() {
    const latLng = new LatLng(this.person.lat, this.person.lng);

    this.googleMaps.new('map', latLng.lat, latLng.lng, 12);

    this.googleMaps.addMarker(`${this.person.name} ${this.person.lastName}`, this.person);

    this.onMapSelected.emit(this.person);
  }

  onPersonEdit() {
    this.onEditPerson.emit(this.person);
  }

  getHealthCheckDisplay(code: number): string {
    return HealthCheck.displayName(code);
  }
}
