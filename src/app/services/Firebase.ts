import * as firebase from 'firebase';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Firebase {
  public readonly inst;

  constructor() {
    const firebaseConfig = {
      apiKey: environment.FIREBASE_API_KEY,
      authDomain: environment.FIREBASE_AUTH_DOMAIN,
      databaseURL: environment.FIREBASE_DATABASE_URL,
      projectId: environment.FIREBASE_PROJECT_ID,
      storageBucket: environment.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: environment.FIREBASE_MESSAGING_SENDER_ID,
      appId: environment.FIREBASE_APP_ID,
      measurementId: environment.FIREBASE_MEASUREMENT_ID,
    };

    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    this.inst = firebase;
  }

  database() {
    return firebase.database();
  }

  ref(ref) {
    return firebase.database().ref(ref);
  }
}
