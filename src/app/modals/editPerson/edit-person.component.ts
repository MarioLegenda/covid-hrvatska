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
  selector: 'app-edit-person-dialog',
  templateUrl: './edit-person.component.html',
  styleUrls: [
    './edit-person.component.scss',
    '../../view/shared/scss/global-dialog.component.scss',
  ]
})
export class EditPersonDialogComponent implements OnInit, OnDestroy {
  person: Person = null;
  errorMatcher = new ErrorMatcher();

  selectedHealth = null;
  healthChangeLabel = null;

  firebaseError = false;
  userExists = null;

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

  personForm = null;
  formValid = false;
  formLoaded = false;

  private updateSubscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<EditPersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any,
    private peopleRepository: PeopleRepository,
    private googleMaps: GoogleMaps)
  {}

  ngOnInit() {
    this.personForm = StaticPersonForm.createExistingForm(this.model.person);

    this.selectedHealth = this.model.person.healthCheck;

    this.onHealthChange();

    if (this.model.lat) this.personForm.get('lat').setValue(this.person.lat);
    if (this.model.lng) this.personForm.get('lng').setValue(this.person.lng);

    this.formValid = this.personForm.valid;

    this.formLoaded = true;
  }

  ngOnDestroy() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
      this.updateSubscription = null;
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
    const values = this.personForm.value;
    this.firebaseError = false;
    this.userExists = null;

    if (values.healthCheckDate && Object.prototype.toString.call(values.healthCheckDate) === '[object Date]') {
      const date = values.healthCheckDate;
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      values.healthCheckDate = `${day}/${month}/${year}`;
    } else {
      values.healthCheckDate = this.personForm.value.healthCheckDate.format('D/M/YYYY');
    }

    const person: Person = Person.fromObject(values);

    this.updateSubscription = this.peopleRepository.updatePerson(person).subscribe((model) => {
      if (model.error) {
        console.log('There has been an error');
        return;
      }

      this.googleMaps.updateMarker(person);

      this.dialogRef.close();
    });
  }
}
