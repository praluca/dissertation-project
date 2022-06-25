import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
const ELEMENT_DATA: any = [
  {
    speciality: 'Cardiologie',
    category: 'Investigatie laborator',
    type: 'Medicina Muncii',
    location: 'Screening',
    price: '110',
  },
  {
    speciality: 'Cardiologie',
    category: 'Consultatie clinica',
    type: 'Interventii Chirurgicale',
    location: 'Screening',
    price: '200',
  },
  {
    speciality: 'Cardiologie',
    category: 'Consultatie clinica',
    type: 'Proceduri medicale',
    location: 'Screening',
    price: '500',
  },
  {
    speciality: 'Cardiologie',
    category: 'Consultatie clinica',
    type: 'Medicina Muncii',
    location: 'Screening',
    price: '100',
  },
  {
    speciality: 'Cardiologie',
    category: 'Consultatie clinica',
    type: 'Medicina Muncii',
    location: 'Screening',
    price: '150',
  },
  {
    speciality: 'Cardiologie',
    category: 'Investigatie laborator',
    type: 'Imunologie',
    location: 'Screening',
    price: '150',
  },
  {
    speciality: 'Cardiologie',
    category: 'Investigatie laborator',
    type: 'Proceduri medicale',
    location: 'Screening',
    price: '1000',
  },
  {
    speciality: 'Cardiologie',
    category: 'Investigatie laborator',
    type: 'TOXICOLOGIE',
    location: 'Screening',
    price: '100',
  },
];

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  displayedColumns: string[] = [
    'speciality',
    'category',
    'type',
    'location',
    'price',
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
