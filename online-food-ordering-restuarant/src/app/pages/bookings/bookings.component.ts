import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookingsService } from 'src/app/service/bookings.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent implements OnInit {
  
  searchTerm: string = '';
  bookings: any[] = [];
 
  constructor(
    private http: HttpClient,
    private BookingsService: BookingsService
  ) {}

  ngOnInit(): void {
    this.BookingsService.getBookings().subscribe((booking: any) => {
      this.bookings = booking.data;
      console.log(this.bookings);
    });
    this.searchBookings()
  }
  searchBookings(): any[] {
    return this.bookings.filter((booking: any) =>
      booking.attributes.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  approveItem(booking: any) {
    const id = booking.id;
    const status = 'Approved';
    const index = this.bookings.findIndex((r: any) => r.id === booking.id);
    console.log(index);

    this.BookingsService.updateItemStatus(id, status).subscribe(
      (res) => {
        console.log(res, 'see console');
        window.location.reload();
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
