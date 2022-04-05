import {Component, Inject, OnInit} from '@angular/core';
import {BookService} from "../service/book.service";
import {Book} from "../model/book";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-detail',
  templateUrl: './dialog-detail.component.html',
  styleUrls: ['./dialog-detail.component.css']
})
export class DialogDetailComponent implements OnInit {
  bookForm!:FormGroup;

  book!:Book;

  constructor(private formBuilder:FormBuilder,
              private bookService:BookService,
              @Inject(MAT_DIALOG_DATA) public editData: any,
              private matDialogRef: MatDialogRef<DialogDetailComponent>) { }

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      id:['',[Validators.required]],
      title: ['',[Validators.required]],
      author: ['',[Validators.required]],
      description:['',[Validators.required]]
    })
    if(this.editData){
      this.bookForm.controls['id'].setValue(this.editData.id);
      this.bookForm.controls['title'].setValue(this.editData.title);
      this.bookForm.controls['author'].setValue(this.editData.author);
      this.bookForm.controls['description'].setValue(this.editData.description);
    }
  }



}
