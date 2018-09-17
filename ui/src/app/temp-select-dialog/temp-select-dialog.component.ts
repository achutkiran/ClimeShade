import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-temp-select-dialog',
  templateUrl: './temp-select-dialog.component.html',
  styleUrls: ['./temp-select-dialog.component.css']
})
export class TempSelectDialogComponent implements OnInit {
  selectedImage:string;
  constructor(private dialogRef:MatDialogRef<TempSelectDialogComponent>) { }

  ngOnInit() {
  }

  close(){
    this.dialogRef.close();
  }

  save(){
    this.dialogRef.close(this.selectedImage);
  }

}
