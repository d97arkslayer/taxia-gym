import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { EquipmentService } from '../services/equipment.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-machines',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit, OnDestroy {

  dataSource: any = [];
  arrayEquipment: Observable<any>;
  equipment : any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private __service: EquipmentService, private changeDetectorRef: ChangeDetectorRef, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.__service.getEquipment().subscribe(result => {
      this.equipment = result;
      this.dataSource = new MatTableDataSource<any>(this.equipment);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.arrayEquipment = this.dataSource.connect();
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
    });
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

}
