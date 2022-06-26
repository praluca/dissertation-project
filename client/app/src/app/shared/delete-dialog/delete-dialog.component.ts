import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { response } from 'express';
import { ApiService } from '../api.service';
import { UpdateService } from '../update.service';
import { formatDate } from '../utils/formatDate';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  formatDate = formatDate;
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private updateService: UpdateService
  ) {}

  ngOnInit(): void {}
  onNoClick() {
    this.dialogRef.close();
  }
  onYesClick() {
    this.apiService
      .deleteConsultation(this.data.data._id)
      .subscribe((response: any) => {
        if (response.deleted === true) {
          this.updateService.updateConsTable(true);
        }
        this.dialogRef.close();
      });
  }
}
