import * as slugify from 'slugify';
import {Person} from './Person';
import {IUniquePerson} from './IUniquePerson';

export class UniquePerson implements IUniquePerson {
  readonly name: string;
  readonly lastName: string;
  readonly lat: number;
  readonly lng: number;

  constructor(
    name: string,
    lastName: string,
    lat: number,
    lng: number,
  ) {
    this.name = name;
    this.lastName = lastName;
    this.lat = lat;
    this.lng = lng;
  }

  createId(): string {
    const latString = this.lat + '';
    const lngString = this.lat + '';

    const lat = latString.replace(/\./, '_');
    const lng = lngString.replace(/\./, '_');

    const unresolvedId = `${this.name} ${this.lastName} ${lat} ${lng}`;
    //@ts-ignore
    return slugify(unresolvedId, {
      replacement: '-',
      lower: true,
    });
  }

  equals(person: IUniquePerson): boolean {
    return this.createId() === person.createId();
  }
}
