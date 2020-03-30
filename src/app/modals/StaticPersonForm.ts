import {FormControl, FormGroup, Validators} from '@angular/forms';

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
        Validators.min(1),
        Validators.max(200),
      ]),
      state: new FormControl('', [
        Validators.required,
        Validators.max(200),
      ]),
      oib: new FormControl('', [
        Validators.max(200),
      ]),
      personalId: new FormControl('', [
        Validators.max(200),
      ]),
      personalNote: new FormControl('', [
        Validators.max(1000),
      ]),
      address: new FormControl('', [
        Validators.max(200),
      ]),
      region: new FormControl('', [
        Validators.max(200),
      ]),
      city: new FormControl('', [
        Validators.max(200),
      ]),
      postalCode: new FormControl('', [
        Validators.max(200),
      ]),
      additionalLocationData: new FormControl('', [
        Validators.max(1000),
      ]),
      lat: new FormControl('', [
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
}
