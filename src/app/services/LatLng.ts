export class LatLng {
  readonly lat: number;
  readonly lng: number;

  constructor(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }

  toObject() {
    return {
      lat: this.lat,
      lng: this.lng,
    }
  }
}
