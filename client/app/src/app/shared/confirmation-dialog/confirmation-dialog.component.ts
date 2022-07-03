import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { response } from 'express';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('data', this.data);
  }
  onNoClick() {
    this.dialogRef.close();
  }
  onYesClick() {
    let body = {
      doctorName: this.data.doctorName,
      specialisation: this.data.specialisation,
      date: this.data.date,
      hour: this.data.hour,
    };
    this.apiService
      .addAppointements(body, this.data.pacientId, this.data.doctorId)
      .subscribe((response: any) => {
        console.log('response', response);
        this.dialogRef.close();
        this.router.navigate(['/appointments']);
      });
  }
}
