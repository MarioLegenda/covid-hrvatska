import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {LatLng} from './LatLng';
import {Person} from '../model/Person';
import {HealthCheck} from '../model/HealthCheck';

@Injectable({
  providedIn: 'root',
})
export class GoogleMaps {
  private map;
  private markers: any = {};
  private clickSubject: ReplaySubject<LatLng> = new ReplaySubject<LatLng>();

  new(id: string, lat: number, lng: number, zoom: number = 8) {
    //@ts-ignore
    this.map = new google.maps.Map(document.getElementById(id), {
      center: {lat: lat, lng: lng},
      zoom: zoom,
      disableDefaultUI: true,
    });

    return this.map;
  }

  click(): ReplaySubject<LatLng> {
    //@ts-ignore
    this.map.addListener('click', (event) => {
      const lat: number = event.latLng.lat();
      const lng: number = event.latLng.lng();

      this.clickSubject.next(new LatLng(lat, lng));
    });

    return this.clickSubject;
  }

  createInfoWindow(person: Person): any {
    const name = `<div style="padding: 10px; width: 100%; float: left">
        <label style="width: 30% margin-right: 5%">Ime:</label><label style="width: 50%">${person.name}</label>
</div>`;
    const lastName = `<div style="padding: 10px; width: 100%; float: left">
        <label style="width: 30% margin-right: 5%">Prezime:</label><label>${person.lastName}</label>
</div>`;

    const country = `<div style="padding: 10px; width: 100%; float: left">
        <label style="width: 30% margin-right: 5%">Država:</label><label>${person.country}</label>
</div>`;

    const lat = `<div style="padding: 10px; width: 100%; float: left">
        <label style="width: 30% margin-right: 5%">Lat:</label><label>${person.lat}</label>
</div>`;

    const lng = `<div style="padding: 10px; width: 100%; float: left">
        <label style="width: 30% margin-right: 5%">Lng:</label><label>${person.lng}</label>
</div>`;

    const healthCheck = `<div style="padding: 10px; width: 100%; float: left">
        <label style="width: 30% margin-right: 5%">Zdravstveno stanje:</label><label>${HealthCheck.displayName(person.healthCheck)}</label>
</div>`;

    const healthCheckDate = `<div style="padding: 10px; width: 100%; float: left">
        <label style="width: 30% margin-right: 5%">Datum zdravstvenog stanja:</label><label>${person.healthCheckDate}</label>
</div>`;

    const oib = `<div style="padding: 10px; width: 100%; float: left">
        <label style="width: 30% margin-right: 5%">OIB:</label><label>${person.oib}</label>
</div>`;

    const personalId = `<div style="padding: 10px; width: 100%; float: left">
        <label style="width: 30% margin-right: 5%">Osobni broj:</label><label>${person.personalId}</label>
</div>`;

    const personalNote = `<div style="padding: 10px; width: 100%; float: left">
        <label style="width: 30% margin-right: 5%">Osobna bilješka:</label><label>${person.personalNote}</label>
</div>`;

    const address = `<div style="padding: 10px; width: 100%; float: left">
        <label style="width: 30% margin-right: 5%">Adresa:</label><label>${person.address}</label>
</div>`;

    const region = `<div style="padding: 10px; width: 100%; float: left">
        <label style="width: 30% margin-right: 5%">Regija:</label><label>${person.region}</label>
</div>`;

    const city = `<div style="padding: 10px; width: 100%; float: left">
        <label style="width: 30% margin-right: 5%">Grad/mjesto boravka:</label><label>${person.city}</label>
</div>`;

    const postalCode = `<div style="padding: 10px; width: 100%; float: left">
        <label style="width: 30% margin-right: 5%">Poštanski broj:</label><label>${person.postalCode}</label>
</div>`;

    const additionalLocationData = `<div style="padding: 10px; width: 100%; float: left">
        <label style="width: 30% margin-right: 5%">Dodatni lokacijski podaci:</label><label>${person.additionalLocationData}</label>
</div>`;

    const homePhone = `<div style="padding: 10px; width: 100%; float: left">
        <label style="width: 30% margin-right: 5%">Osobni telefon/mob:</label><label>${person.homePhone}</label>
</div>`;

    const workPhone = `<div style="padding: 10px; width: 100%; float: left">
        <label style="width: 30% margin-right: 5%">Radni telefon/mob:</label><label>${person.workPhone}</label>
</div>`;

    const personalPhone = `<div style="padding: 10px; width: 100%; float: left">
        <label style="width: 30% margin-right: 5%">Osobni telefon/mob:</label><label>${person.personalPhone}</label>
</div>`;

    const email = `<div style="padding: 10px; width: 100%; float: left">
        <label style="width: 30% margin-right: 5%">Email:</label><label>${person.email}</label>
</div>`;

    const layout = `<div style="width: 480px; height: 200px; float: left">
        ${name}
        ${lastName}
        ${country}
        ${lat}
        ${lng}
        ${healthCheck}
        ${healthCheckDate}
        ${oib}
        ${personalId}
        ${personalNote}
        ${address}
        ${region}
        ${city}
        ${postalCode}
        ${additionalLocationData}
        ${homePhone}
        ${workPhone}
        ${personalPhone}
        ${email}
</div>`;

    //@ts-ignore
    return new google.maps.InfoWindow({
      content: layout
    });

  }

  addMarker(title: string, person: Person) {
    const latLng = new LatLng(person.lat, person.lng);
    //@ts-ignore
    const marker = new google.maps.Marker({
      position: latLng.toObject(),
      title: title,
      label: HealthCheck.getMark(person.healthCheck),
    });

    const infoWindow = this.createInfoWindow(person);

    marker.addListener('click', () => {
      infoWindow.open(this.map, marker);
    });

    marker.setMap(this.map);

    this.markers[person.createId()] = {
      marker: marker,
      healthCheck: person.healthCheck,
    }
  }

  checkAndAdd(title: string, p: Person) {
    const id = p.createId();
    const marker = this.markers[id];

    if (marker) {
      marker.marker.setMap(this.map);
      marker.healthCheck = p.healthCheck;
    } else {
      this.addMarker(title, p);
    }
  }

  updateMarker(person: Person) {
    const id: string = person.createId();
    const marker = this.markers[id];

    this.unsetMarker(marker.marker);

    delete this.markers[person.createId()];

    this.addMarker(person.getDisplayName(), person);
  }

  showHealthCheck(representation: any): void {
    if (representation.length === 0) {
      return this.showAllMaps();
    }

    for (const r of representation) {
      if (r.status) {
        const code = HealthCheck.getCode(r.mark);
        const markers = this.findMarkersByCode(code);

        for (const marker of markers) {
          marker.marker.setMap(this.map);
        }
      } else if (!r.status) {
        const code = HealthCheck.getCode(r.mark);
        const markers = this.findMarkersByCode(code);

        for (const marker of markers) {
          marker.marker.setMap(null);
        }
      }
    }
  }

  private unsetMarker(marker, clearListener: boolean = true) {
    if (clearListener) {
      //@ts-ignore
      google.maps.event.clearInstanceListeners(marker);
    }

    marker.setMap(null);
  }

  private findMarkersByCode(code: number): any {
    //@ts-ignore
    return Object.values(this.markers).filter(m => m.healthCheck === code);
  }

  private showAllMaps(): void {
    const markers = Object.values(this.markers);

    for (const m of markers) {
      //@ts-ignore
      m.marker.setMap(this.map);
    }
  }
}
