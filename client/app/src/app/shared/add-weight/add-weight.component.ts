import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { UpdateService } from '../update.service';

@Component({
  selector: 'app-add-weight',
  templateUrl: './add-weight.component.html',
  styleUrls: ['./add-weight.component.scss'],
})
export class AddWeightComponent implements OnInit {
  currentWeight = 0;
  currentSistolicTension = 0;
  currentDiastolicTension = 0;
  constructor(
    public dialogRef: MatDialogRef<AddWeightComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private updateService: UpdateService
  ) {}

  ngOnInit(): void {}
  onNoClick() {
    this.dialogRef.close();
  }
  onYesClick() {
    let newInfo = this.data.data;
    if (this.data.type === 'WEIGHT') {
      newInfo.weightHistory.push(Number(this.currentWeight));
    } else {
      newInfo.sistolicTensionHistory.push(Number(this.currentSistolicTension));
      newInfo.diastolicTensionHistory.push(
        Number(this.currentDiastolicTension)
      );
      console.log('newInfo', newInfo);
    }

    this.apiService
      .editVitalInformations(newInfo._id, newInfo)
      .subscribe((response: any) => {
        this.updateService.updateWeightChart(newInfo);
        console.log('test', newInfo);
        this.dialogRef.close();
      });
  }
}
