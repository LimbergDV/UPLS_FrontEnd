import { Component, Input } from '@angular/core';
import { iDonorSearch } from '../../models/iDonorSearch';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'view-results',
  templateUrl: './view-results.component.html',
  styleUrl: './view-results.component.css',
})
export class ViewResultsComponent implements AfterViewInit {
  @Input() donors: iDonorSearch[] = [];

  displayedColumns: string[] = [
    'name',
    'address',
    'blood_type',
    'compatibility',
    'chat',
  ];
  dataSource: MatTableDataSource<iDonorSearch>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.donors);
  }

  ngOnChanges() {
    if (this.donors) {
      this.dataSource.data = this.donors;
    }
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
