import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/shared/api.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

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
  dataSource: any;
  searchText: any;
  initialData: any;

  constructor(public dialog: MatDialog, private apiService: ApiService) {}

  ngOnInit(): void {
    this.initialData = this.dataSource;
    this.apiService.getInvestigations().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response.investigations);
    });
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
