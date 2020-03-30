import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class GoogleMaps {
  constructor(
  ) {}

  new(id: string, lat: number, lng: number) {
    //@ts-ignore
    return new window.google.maps.Map(document.getElementById(id), {
      center: {lat: lat, lng: lng},
      zoom: 8,
      disableDefaultUI: true,
    });
  }
}
