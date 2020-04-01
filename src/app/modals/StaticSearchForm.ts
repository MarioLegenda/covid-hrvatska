import {FormControl, FormGroup} from '@angular/forms';

export class StaticSearchForm {
  static createForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [
      ]),
      lastName: new FormControl('', [
      ]),
    });
  }
}
