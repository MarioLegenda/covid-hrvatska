import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {ErrorMatcher} from '../ErrorMatcher';
import {StaticPersonForm} from '../StaticPersonForm';
import {Person} from '../../model/Person';
import {HealthCheck} from '../../model/HealthCheck';
import {GoogleMaps} from '../../services/GoogleMaps';
import {PeopleRepository} from '../../services/PeopleRepository';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-person-dialog',
  templateUrl: './add-person.component.html',
  styleUrls: [
    './add-person.component.scss',
    '../../view/shared/scss/global-dialog.component.scss',
  ]
})
export class AddPersonDialogComponent implements OnInit, OnDestroy {
  errorMatcher = new ErrorMatcher();

  selectedHealth = null;
  healthChangeLabel = null;

  firebaseError = false;
  userExists = null;
  inFlight = false;

  healthData = [
    {
      label: HealthCheck.displayName(HealthCheck.INFECTED),
      value: HealthCheck.INFECTED,
    },
    {
      label: HealthCheck.displayName(HealthCheck.SELF_ISOLATED),
      value: HealthCheck.SELF_ISOLATED,
    },
    {
      label: HealthCheck.displayName(HealthCheck.NOT_INFECTED),
      value: HealthCheck.NOT_INFECTED,
    },
    {
      label: HealthCheck.displayName(HealthCheck.CURED),
      value: HealthCheck.CURED,
    },
    {
      label: HealthCheck.displayName(HealthCheck.NOT_DETERMINED),
      value: HealthCheck.NOT_DETERMINED
    }
  ];

  personForm = StaticPersonForm.createForm();

  private saveSubscriber: Subscription;

  constructor(
    public dialogRef: MatDialogRef<AddPersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any,
    private googleMaps: GoogleMaps,
    private peopleRepository: PeopleRepository)
  {}

  ngOnInit() {
    if (this.model.lat) this.personForm.get('lat').setValue(this.model.lat);
    if (this.model.lng) this.personForm.get('lng').setValue(this.model.lng);
  }

  ngOnDestroy() {
    if (this.saveSubscriber) {
      this.saveSubscriber.unsubscribe();
      this.saveSubscriber = null;
    }
  }

  onHealthChange() {
    if (this.selectedHealth === HealthCheck.INFECTED) {
      this.healthChangeLabel = 'Datum zaraze';
    } else if (this.selectedHealth === HealthCheck.CURED) {
      this.healthChangeLabel = 'Datum ozdravljenja';
    } else if (this.selectedHealth === HealthCheck.SELF_ISOLATED) {
      this.healthChangeLabel = 'Datum samoizolacije';
    }
  }

  onClose() {
    this.dialogRef.close({
      state: 'closed',
      data: null,
    });
  }

  onSave() {
    if (this.inFlight) return;

    this.inFlight = true;
    const values = this.personForm.value;
    this.firebaseError = false;
    this.userExists = null;

    if (values.healthCheckDate) {
      values.healthCheckDate = this.personForm.value.healthCheckDate.format('DD/MM/YYYY');
    }

    const person: Person = Person.fromObject(values);

    this.peopleRepository.savePerson(person).subscribe((model) => {
      if (model.error) {
        const message = model.error.message;

        if (message === 'firebase_error') {
          this.firebaseError = true;
        } else if (message === 'user_exists') {
          return this.userExists = `Osoba sa ovim imenom i koordinatam je već unesena.`
        }

        this.inFlight = false;

        return;
      }

      const person: Person = model.person;

      this.googleMaps.addMarker(person.getDisplayName(), person);

      this.dialogRef.close();
    });
  }
}
