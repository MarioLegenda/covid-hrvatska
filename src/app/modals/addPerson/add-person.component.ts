import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {ErrorMatcher} from '../ErrorMatcher';
import {StaticPersonForm} from '../StaticPersonForm';
import {Firebase} from '../../services/Firebase';

@Component({
  selector: 'app-add-person-dialog',
  templateUrl: './add-person.component.html',
  styleUrls: [
    './add-person.component.scss',
    '../../view/shared/scss/global-dialog.component.scss',
  ]
})
export class AddPersonDialogComponent {
  errorMatcher = new ErrorMatcher();

  selectedHealth = null;
  healthChangeLabel = null;

  healthData = [
    {
      label: 'Zaražen',
      value: 'infected',
    },
    {
      label: 'Samoizolacija',
      value: 'isolated',
    },
    {
      label: 'Izliječen',
      value: 'cured',
    },
    {
      label: 'Neodređeno',
      value: 'notDetermined'
    }
  ];

  personForm = StaticPersonForm.createForm();

  constructor(
    public dialogRef: MatDialogRef<AddPersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any,
    private firebase: Firebase)
  {}

  onHealthChange() {
    if (this.selectedHealth === 'infected') {
      this.healthChangeLabel = 'Datum zaraze';
    } else if (this.selectedHealth === 'cured') {
      this.healthChangeLabel = 'Datum ozdravljenja';
    } else if (this.selectedHealth === 'isolated') {
      this.healthChangeLabel = 'Datum izolacije';
    }
  }

  onClose() {
    this.dialogRef.close({
      state: 'closed',
      data: null,
    });
  }

  onSave() {
    console.log(this.personForm.value);
  }
}
