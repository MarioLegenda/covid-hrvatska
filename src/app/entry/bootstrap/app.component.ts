import {Component, OnDestroy, OnInit} from '@angular/core';
import {GoogleMaps} from '../../services/GoogleMaps';
import {Person} from '../../model/Person';
import {Subscription} from 'rxjs';
import {PeopleRepository} from '../../services/PeopleRepository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private loadAllObserver: Subscription;

  constructor(
    private googleMaps: GoogleMaps,
    private peopleRepository: PeopleRepository,
  ) {}

  ngOnInit() {
    this.googleMaps.new('map', 44.72525987951349, 16.394358, 7);

    this.loadAllPeople();
  }

  ngOnDestroy() {
    if (this.loadAllObserver) {
      this.loadAllObserver.unsubscribe();
      this.loadAllObserver = null;
    }
  }

  private loadAllPeople(): void {
    this.loadAllObserver = this.peopleRepository.getAll().subscribe((person: Person) => {
      if (!person) return;

      const p: Person = Person.fromObject(person);

      this.googleMaps.checkAndAdd(p.getDisplayName(), p);
    });
  }
}
