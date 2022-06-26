import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { UpdateService } from 'src/app/shared/update.service';
import { formatDate } from 'src/app/shared/utils/formatDate';

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.scss'],
})
export class ConsultationsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'doctorName',
    'specialisation',
    'investigation',
    'date',
    'diagnosis',
    'settings',
  ];
  dataSource: any;
  searchText: any;
  initialData: any;
  formatDate = formatDate;
  currentUpdateTableSubscription: Subscription = Subscription.EMPTY;

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
    private updateService: UpdateService
  ) {}

  ngOnInit(): void {
    let currentUser = this.localStorageService.get('user');
    console.log('user', currentUser);
    this.initialData = this.dataSource;
    this.currentUpdateTableSubscription =
      this.updateService.currentUpdateConsultationsTable.subscribe(
        (response) => {
          if (response === true) {
            this.apiService
              .getConsultations(currentUser._id)
              .subscribe((response: any) => {
                this.dataSource = new MatTableDataSource(
                  response.consultations
                );
              });
          }
        }
      );
    this.apiService
      .getConsultations(currentUser._id)
      .subscribe((response: any) => {
        this.dataSource = new MatTableDataSource(response.consultations);
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
  deleteConsultation(elem: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      height: '210px',
      data: { data: elem },
    });
  }

  ngOnDestroy(): void {
    this.currentUpdateTableSubscription.unsubscribe();
  }
}
