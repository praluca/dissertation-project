import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
const ELEMENT_DATA: any = [
  {
    doctor_name: 'Robert',
    specialisation: 'Medicina Muncii',
    time: '15:30',
    date: '10/10/2021',
    status: 'programare onorata',
  },
  {
    doctor_name: 'Popa Raluca',
    specialisation: 'Medicina Muncii',
    time: '15:30',
    date: '10/10/2021',
    status: 'programare neonorata',
  },
  {
    doctor_name: 'Popa Raluca',
    specialisation: 'Medicina Muncii',
    time: '15:30',
    date: '10/10/2021',
    status: 'programare viitoare',
  },
  {
    doctor_name: 'Robert',
    specialisation: 'Medicina Muncii',
    time: '15:30',
    date: '10/10/2021',
    status: 'programare onorata',
  },
  {
    doctor_name: 'Popa Raluca',
    specialisation: 'Medicina Muncii',
    time: '15:30',
    date: '10/10/2021',
    status: 'programare neonorata',
  },
  {
    doctor_name: 'Popa Raluca',
    specialisation: 'Medicina Muncii',
    time: '15:30',
    date: '10/10/2021',
    status: 'programare viitoare',
  },
  {
    doctor_name: 'Robert',
    specialisation: 'Medicina Muncii',
    time: '15:30',
    date: '10/10/2021',
    status: 'programare onorata',
  },
  {
    doctor_name: 'Popa Raluca',
    specialisation: 'Medicina Muncii',
    time: '15:30',
    date: '10/10/2021',
    status: 'programare neonorata',
  },
  {
    doctor_name: 'Popa Raluca',
    specialisation: 'Medicina Muncii',
    time: '14:20',
    date: '10/10/2021',
    status: 'programare viitoare',
  },
];
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {
  searchText: any = '';
  displayedColumns: string[] = [
    'doctor_name',
    'specialisation',
    'date',
    'time',
    'status',
    'settings',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor() {}

  ngOnInit(): void {}
  onSearch() {
    console.log('search');
  }
  onSearchInput(event: any) {
    console.log('search input');
  }
}
