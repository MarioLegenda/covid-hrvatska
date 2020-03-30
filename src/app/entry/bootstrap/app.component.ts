import {Component, OnInit} from '@angular/core';
import {GoogleMaps} from '../../services/GoogleMaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private googleMaps: GoogleMaps) {}

  ngOnInit() {
    this.googleMaps.new('map', 45.604419, 16.394358);
  }
}
