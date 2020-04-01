import * as slugify from 'slugify';
import {IUniquePerson} from './IUniquePerson';

export class Person implements IUniquePerson {
  readonly name: string;
  readonly lastName: string;
  readonly country: string;
  readonly lat: number;
  readonly lng: number;
  readonly healthCheck: number;
  readonly oib: string = null;
  readonly personalId: string = null;
  readonly personalNote: string = null;
  readonly address: string = null;
  readonly region: string = null;
  readonly city: string = null;
  readonly postalCode: string = null;
  readonly additionalLocationData: string = null;
  readonly healthCheckDate: string = null;
  readonly homePhone: string = null;
  readonly workPhone: string = null;
  readonly personalPhone: string = null;
  readonly email: string = null;

  listKey: string;

  constructor(
    name: string,
    lastName: string,
    country: string,
    lat: number,
    lng: number,
    healthCheck: number,
    oib: string = null,
    personalId: string = null,
    personalNote: string = null,
    address: string = null,
    region: string = null,
    city: string = null,
    postalCode: string = null,
    additionalLocationData: string = null,
    healthCheckDate: string = null,
    homePhone: string = null,
    workPhone: string = null,
    personalPhone: string = null,
    email: string = null,
  ) {
    this.name = name;
    this.lastName = lastName;
    this.country = country;
    this.lat = lat;
    this.lng = lng;
    this.healthCheck = healthCheck;
    this.oib = oib;
    this.personalId = personalId;
    this.personalNote = personalNote;
    this.address = address;
    this.region = region;
    this.city = city;
    this.postalCode = postalCode;
    this.additionalLocationData = additionalLocationData;
    this.healthCheckDate = healthCheckDate;
    this.homePhone = homePhone;
    this.workPhone = workPhone;
    this.personalPhone = personalPhone;
    this.email = email;
  }

  setListKey(listKey: string): void {
    this.listKey = listKey;
  }

  toFirebaseObject() {
    return {
      listKey: this.listKey,
      name: this.name,
      lastName: this.lastName,
      country: this.country,
      lat: this.lat,
      lng: this.lng,
      healthCheck: this.healthCheck,
      oib: this.oib,
      personalId: this.personalId,
      personalNote: this.personalNote,
      address: this.address,
      region: this.region,
      city: this.city,
      postalCode: this.postalCode,
      additionalLocationData: this.additionalLocationData,
      healthCheckDate: this.healthCheckDate,
      homePhone: this.homePhone,
      workPhone: this.workPhone,
      personalPhone: this.personalPhone,
      email: this.email,
    }
  }

  static fromObject(values): Person {
    return new Person(
      values.name,
      values.lastName,
      values.country,
      parseFloat(values.lat),
      parseFloat(values.lng),
      values.healthCheck,
      values.oib,
      values.personalId,
      values.personalNote,
      values.address,
      values.region,
      values.city,
      values.postalCode,
      values.additionalLocationData,
      values.healthCheckDate,
      values.homePhone,
      values.workPhone,
      values.personalPhone,
      values.email,
    );
  }

  getDisplayName(): string {
    return `${this.name} ${this.lastName}`;
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
