import {Component} from '@angular/core';
import {AddPersonDialogComponent} from '../../../modals/addPerson/add-person.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  constructor(private dialog: MatDialog) {
  }

  onAddPerson() {
    const dialogRef = this.dialog.open(AddPersonDialogComponent, {
      width: '80%',
      data: {
        title: 'Dodaj novu osobu'
      },
    });

    dialogRef.afterClosed().subscribe((decision) => {

    });
  }
}
