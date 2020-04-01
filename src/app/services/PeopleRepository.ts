import {Firebase} from './Firebase';
import {Injectable} from '@angular/core';
import {Person} from '../model/Person';
import {ReplaySubject} from 'rxjs';
import {UniquePerson} from '../model/UniquePerson';
import {IUniquePerson} from '../model/IUniquePerson';

@Injectable({
  providedIn: 'root',
})
export class PeopleRepository {
  private loadAllSubject: ReplaySubject<Person> = new ReplaySubject<Person>();
  private savePersonSubject: ReplaySubject<any> = new ReplaySubject<any>();
  private updatePersonSubject: ReplaySubject<any> = new ReplaySubject<any>();
  private removePersonSubject: ReplaySubject<any> = new ReplaySubject<any>();

  constructor(
    private firebase: Firebase
  ) {}

  getAll(): ReplaySubject<Person> {
    this.firebase.ref('/people').on('value', (snapshot) => {
      const val = snapshot.val();

      if (!val) return this.loadAllSubject.next(null);

      const values: Person[] = Object.values(val);

      for (const v of values) {
        this.loadAllSubject.next(v);
      }
    });

    return this.loadAllSubject;
  }

  savePerson(person: Person) {
    const id = person.createId();

    this.firebase.ref(`/people/${id}`).once('value', (snapshot) => {
      if (snapshot.val()) {
        return this.savePersonSubject.next({
          error: new Error('user_exists'),
        });
      }

      const pushRef = this.firebase.ref('/people/list').push();
      const refKey = pushRef.key;

      person.setListKey(refKey);

      const model = person.toFirebaseObject();

      this.firebase.ref(`/people/${id}`).set(model, (err) => {
        if (err) {
          return this.savePersonSubject.next({
            error: new Error('firebase_error'),
          });
        } else {
          const model = person.toFirebaseObject();

          model['id'] = id;
          model['lowerName'] = model.name.toLowerCase();
          model['lowerLastName'] = model.lastName.toLowerCase();
          model['lowerDisplayName'] = `${model.name.toLowerCase()}${model.lastName.toLowerCase()}`

          model['refKey'] = refKey;
          pushRef.set(model, (err) => {
            if (err) {
              return this.savePersonSubject.next({
                error: new Error('firebase_error'),
              });
            }

            this.savePersonSubject.next({
              person: Person.fromObject(model),
            });
          });
        }
      });
    });

    return this.savePersonSubject;
  }

  updatePerson(person: Person) {
    const id = person.createId();

    this.firebase.ref(`/people/${id}`).once('value', (snapshot) => {
      if (!snapshot.val()) {
        return this.savePersonSubject.next({
          error: new Error('user_not_exists'),
        });
      }

      const val = snapshot.val();

      person.setListKey(val['listKey']);

      this.firebase.ref(`/people/${id}`).set(person.toFirebaseObject(), (err) => {
        if (err) {
          return this.updatePersonSubject.next({
            error: new Error('firebase_error'),
          });
        } else {
          const model = person.toFirebaseObject();
          model['id'] = id;
          model['lowerName'] = model.name.toLowerCase();
          model['lowerLastName'] = model.lastName.toLowerCase();
          model['lowerDisplayName'] = `${model.name.toLowerCase()}${model.lastName.toLowerCase()}`

          const updates = {};

          updates['/people/list/' + person.listKey] = model;

          this.firebase.database().ref().update(updates, (err) => {
            if (err) {
              return this.updatePersonSubject.next({
                error: new Error('firebase_error'),
              });
            }

            this.updatePersonSubject.next({
              person: Person.fromObject(model),
            });
          });
        }
      });
    });

    return this.updatePersonSubject;
  }

  removePerson(person: IUniquePerson): ReplaySubject<any> {
    const id: string = person.createId();

    this.firebase.ref(`/people/${id}`).once('value', (snapshot) => {
      const val = snapshot.val();

      const listKey = val['listKey'];

      this.firebase.ref(`/people/list/${listKey}`).remove(() => {
        this.firebase.ref(`/people/${id}`).remove(() => {
          this.removePersonSubject.next();
        });
      });
    });

    return this.removePersonSubject;
  }

  searchByChild(field: string, value: string, limit: number = 100) {
    return this.firebase.ref('/people/list')
      .orderByChild(field)
      .limitToFirst(limit)
      .equalTo(value);
  }

  findOne(field: string, value: string) {
    return this.firebase.ref('/people/list')
      .orderByChild(field)
      .limitToFirst(1)
      .equalTo(value);
  }
}
