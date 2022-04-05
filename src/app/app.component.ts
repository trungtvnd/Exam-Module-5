import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";
import {FormGroup} from "@angular/forms";
import {BookService} from "./service/book.service";
import {Book} from "./model/book";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DialogDetailComponent} from "./dialog-detail/dialog-detail.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  totalBook?:number = 0;
  title = 'frontEndMD5';
  books!: Book[]

  displayedColumns: string[] = [ 'id', 'title','author', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( public dialog: MatDialog,
               private bookService:BookService) {
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
   width:'30%'
    }).afterClosed().subscribe(()=>{
      console.log(this.getAllBook())
      this.getAllBook();
    });
  }

  public getAllBook(){
    this.bookService.getAllBook().subscribe({
      next:(res)=>{
        this.books = res
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.totalBook = res.length
        console.log(res)
      }, error:(err)=>{
        alert('Error while searching product')
      }
    })
  }

  ngOnInit(): void {
    this.getAllBook();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  editBook(row:any) {
    this.dialog.open(DialogComponent,{
      width: '30%',
      data: row
    }).afterClosed().subscribe(() => {
      this.getAllBook();

    })

  }

  deleteBook(id:any) {
    if (confirm('Are you sure delete product: ' + '?')) {
      this.bookService.deleteBook(id).subscribe(() => {
          alert('Delete Successfully!');
          this.getAllBook()

        }
      );
    }
  }


  showDetail(row: any) {
    this.dialog.open(DialogDetailComponent,{
      width:'40%',
      data:row
    }).afterClosed().subscribe(()=>{
      console.log(this.getAllBook())
      this.getAllBook();
    });

  }
}
