import {Component} from '@angular/core';
import {Firebase} from '../../services/Firebase';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {StaticSearchForm} from '../StaticSearchForm';
import {Person} from '../../model/Person';
import {EditPersonDialogComponent} from '../editPerson/edit-person.component';
import {PeopleRepository} from '../../services/PeopleRepository';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search.component.html',
  styleUrls: [
    './search.component.scss',
    '../../view/shared/scss/global-dialog.component.scss',
  ]
})
export class SearchDialogComponent {

  searchForm = StaticSearchForm.createForm();
  emptySearch = false;
  results: Person[] = [];

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<SearchDialogComponent>,
    private firebase: Firebase,
    private peopleRepository: PeopleRepository,
  ) {}

  onMapSelected() {
    this.dialogRef.close();
  }

  onClose() {
    this.dialogRef.close();
  }

  onSearch() {
    this.results = [];
    this.emptySearch = false;

    const name: string = this.searchForm.get('name').value;
    const lastName: string = this.searchForm.get('lastName').value;

    if (!name && !lastName) return;

    if (name && !lastName) {
      return this.search('lowerName', name.toLowerCase());
    } else if (!name && lastName) {
      return this.search('lowerLastName', lastName.toLowerCase());
    } else if (name && lastName) {
      const displayName = `${name.toLowerCase()}${lastName.toLowerCase()}`;
      return this.search('lowerDisplayName', displayName);
    }
  }

  onEditPerson($event: Person) {
    this.dialogRef.close();

    const timeout = setTimeout(() => {
      clearTimeout(timeout);

      this.dialog.open(EditPersonDialogComponent, {
        width: '90%',
        data: {
          title: 'Ažuriraj osobu',
          person: $event,
        },
      });
    }, 1000);
  }

  private search(field: string, value: string): void {
    let ref = this.peopleRepository.searchByChild(field, value, 10);

    ref.once('value', (snapshot) => {
      const val = snapshot.val();

      if (!val) {
        return this.emptySearch = true;
      }

      const values = Object.values(val);

      for (const v of values) {
        this.results.push(Person.fromObject(v));
      }
    });
  }
}
