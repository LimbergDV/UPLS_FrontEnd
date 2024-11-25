import { Component, Input } from '@angular/core';
import { iDonorSearch } from '../../models/iDonorSearch';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ChatService } from '../../service/chat.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  constructor(private chatService: ChatService, private router: Router) {
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

  createConversation(id_donor: number) {
    this.chatService.createConversation(id_donor).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/chats']);
      },
      error: (error) => {
        console.log(error);
        if (error.status == 403) {
          this.router.navigate(['/signIn']);
        }
        if (error.status == 400) {
          this.router.navigate(['/chats']);
        } else {
          Swal.fire('Opss...!', 'Ocurrió un error.', 'error');
        }
      },
    });
  }
}
