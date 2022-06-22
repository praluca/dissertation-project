import { Component, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
const ELEMENT_DATA: any = [
  {
    doctor_name: 'Robert',
    specialisation: 'Medicina Muncii',
    investigation: 'Screening',
    date: '10/10/2021',
    diagnosis: 'Repaus',
  },
  {
    doctor_name: 'Popa Raluca',
    specialisation: 'Medicina Muncii',
    investigation: 'Screening',
    date: '10/10/2021',
    diagnosis: 'Repaus',
  },
  {
    doctor_name: 'Popa Raluca',
    specialisation: 'Medicina Muncii',
    investigation: 'Screening',
    date: '10/10/2021',
    diagnosis: 'Repaus',
  },
  {
    doctor_name: 'Popl Raluca',
    specialisation: 'Medicina Muncii',
    investigation: 'Screening',
    date: '10/10/2021',
    diagnosis: 'Repaus',
  },
  {
    doctor_name: 'Popm Raluca',
    specialisation: 'Medicina Muncii',
    investigation: 'Screening',
    date: '10/10/2021',
    diagnosis: 'Repaus',
  },
  {
    doctor_name: 'Popv Raluca',
    specialisation: 'Medicina Muncii',
    investigation: 'Screening',
    date: '10/10/2021',
    diagnosis: 'Repaus',
  },
  {
    doctor_name: 'Popc Raluca',
    specialisation: 'Medicina Muncii',
    investigation: 'Screening',
    date: '10/10/2021',
    diagnosis: 'Repaus',
  },
  {
    doctor_name: 'Pope Raluca',
    specialisation: 'Medicina Muncii',
    investigation: 'Screening',
    date: '10/10/2021',
    diagnosis: 'Repaus',
  },
];

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.scss'],
})
export class ConsultationsComponent implements OnInit {
  displayedColumns: string[] = [
    'doctor_name',
    'specialisation',
    'investigation',
    'date',
    'diagnosis',
    'settings',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  searchText: any;
  initialData: any;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.initialData = this.dataSource;
  }

  onSearch() {
    console.log('title', this.searchText);
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }
  onSearchInput(event: any) {
    console.log('title_event', event.target.value);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  deleteConsultation() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      height: '200px',
      data: { name: 'Raluca' },
    });
  }
}
