import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Person} from '../model/Person';

export class StaticPersonForm {
  static createForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(200),
      ]),
      lastName: new FormControl('', [
        Validators.required,
      ]),
      homePhone: new FormControl('', [
      ]),
      workPhone: new FormControl('', [
      ]),
      personalPhone: new FormControl('', [
      ]),
      email: new FormControl('', [
      ]),
      country: new FormControl('', [
        Validators.required,
      ]),
      oib: new FormControl('', [
      ]),
      personalId: new FormControl('', [
      ]),
      personalNote: new FormControl('', [
      ]),
      address: new FormControl('', [
      ]),
      region: new FormControl('', [
      ]),
      city: new FormControl('', [
      ]),
      postalCode: new FormControl('', [
      ]),
      additionalLocationData: new FormControl('', [
      ]),
      lat: new FormControl('', [
        Validators.required,
      ]),
      lng: new FormControl('', [
        Validators.required,
      ]),
      healthCheck: new FormControl('', [
        Validators.required,
      ]),
      healthCheckDate: new FormControl('', [])
    });
  }

  static createExistingForm(person: Person) {
    let healthCheckDate = person.healthCheckDate;

    if (healthCheckDate) {
      const split = healthCheckDate.split('/');

      const year = parseInt(split[2]);
      let month = parseInt(split[1]);
      const day = parseInt(split[0]);

      if (month !== 0) {
        month = month - 1;
      }

      //@ts-ignore
      healthCheckDate = new Date(year, month, day);
    }

    return new FormGroup({
      name: new FormControl(person.name, [
        Validators.required,
        Validators.min(1),
        Validators.max(200),
      ]),
      lastName: new FormControl(person.lastName, [
        Validators.required,
      ]),
      homePhone: new FormControl(person.homePhone, [
      ]),
      workPhone: new FormControl(person.workPhone, [
      ]),
      personalPhone: new FormControl(person.personalPhone, [
      ]),
      email: new FormControl(person.email, [
      ]),
      country: new FormControl(person.country, [
        Validators.required,
      ]),
      oib: new FormControl(person.oib, [
      ]),
      personalId: new FormControl(person.personalId, [
      ]),
      personalNote: new FormControl(person.personalNote, [
      ]),
      address: new FormControl(person.address, [
      ]),
      region: new FormControl(person.region, [
      ]),
      city: new FormControl(person.city, [
      ]),
      postalCode: new FormControl(person.postalCode, [
      ]),
      additionalLocationData: new FormControl(person.additionalLocationData, [
      ]),
      lat: new FormControl(person.lat, [
        Validators.required,
      ]),
      lng: new FormControl(person.lng, [
        Validators.required,
      ]),
      healthCheck: new FormControl(person.healthCheck, [
        Validators.required,
      ]),
      healthCheckDate: new FormControl(healthCheckDate, [])
    });
  }
}
