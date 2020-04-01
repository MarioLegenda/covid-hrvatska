import {Component, OnDestroy} from '@angular/core';
import {AddPersonDialogComponent} from '../../modals/addPerson/add-person.component';
import {MatDialog} from '@angular/material';
import {SearchDialogComponent} from '../../modals/search/search.component';
import {GoogleMaps} from '../../services/GoogleMaps';
import {Person} from '../../model/Person';
import {PeopleRepository} from '../../services/PeopleRepository';
import {Subscription} from 'rxjs';
import {reset, handle, getRepresentationByCode, getCompleteStatus} from '../../services/checkboxFrontendRepresentation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnDestroy {
  allSelected: boolean = true;
  infectedSelected: boolean = false;
  notInfectedSelected: boolean = false;
  selfIsolatedSelected: boolean = false;
  curedSelected: boolean = false;
  notDetermined: boolean = false;

  menuExpanded = false;

  private resetField = 'allSelected';
  private loadAllObserver: Subscription;

  constructor(
    private dialog: MatDialog,
    private googleMaps: GoogleMaps,
    private peopleRepository: PeopleRepository,
  ) {}

  ngOnDestroy(): void {
    if (this.loadAllObserver) {
      this.loadAllObserver.unsubscribe();
      this.loadAllObserver = null;
    }
  }

  onExpand() {
    this.menuExpanded = !this.menuExpanded;
  }

  onFilterSelect(filter: string, value: string, checked: boolean) {
    if (filter === this.resetField && checked) {
      reset.call(this, this.resetField);
      this.googleMaps.showHealthCheck([]);
    } else {
      handle.call(this, filter, checked);
      handle.call(this, [this.resetField], false);

      if (!getCompleteStatus()) {
        reset.call(this, this.resetField);
        this.googleMaps.showHealthCheck([]);

        return;
      }

      this.googleMaps.showHealthCheck(getRepresentationByCode());
    }
  }

  onAddPerson() {
    this.dialog.open(AddPersonDialogComponent, {
      width: '90%',
      data: {
        title: 'Dodaj novu osobu'
      },
    });
  }

  onSearch() {
    this.dialog.open(SearchDialogComponent, {
      width: '90%',
      data: {
        title: 'Pretraži'
      },
    });
  }

  onRefresh() {
    reset.call(this, this.resetField);
    this.googleMaps.showHealthCheck([]);

    this.loadAllPeople();
  }

  private loadAllPeople(): void {
    this.loadAllObserver = this.peopleRepository.getAll().subscribe((person: Person) => {
      const p: Person = Person.fromObject(person);

      this.googleMaps.checkAndAdd(p.getDisplayName(), p);
    });
  }
}
