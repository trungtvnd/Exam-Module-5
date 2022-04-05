import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../service/book.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  bookForm!:FormGroup;
  btnAction = 'Save';

  constructor(private formBuilder:FormBuilder,
              private bookService:BookService,
              @Inject(MAT_DIALOG_DATA) public editData: any,
              private matDialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      id:['',[Validators.required]],
      title: ['',[Validators.required]],
      author: ['',[Validators.required]],
      description:['',[Validators.required]]
    })
    if(this.editData){
      this.btnAction = 'Update'
      this.bookForm.controls['id'].setValue(this.editData.id);
      this.bookForm.controls['title'].setValue(this.editData.title);
      this.bookForm.controls['author'].setValue(this.editData.author);
      this.bookForm.controls['description'].setValue(this.editData.description);
    }
  }

  createProduct() {
   if(!this.editData){
     const book = {
       id: this.bookForm.value.id,
       title: this.bookForm.value.title,
       author: this.bookForm.value.author,
       description: this.bookForm.value.description,

     };
     this.bookService.saveBook(book).subscribe(() => {
       alert('Create Successfully');
       console.log(book)

       this.bookForm.reset();
       this.matDialogRef.close('save');
     });
   }else {
     this.updateBook()
   }

  }


  private updateBook() {
    this.bookService.updateBook(this.bookForm.value, this.editData.id)
      .subscribe({
        next:(res) =>{
          alert('Update successfully')
          this.bookForm.reset();
          this.matDialogRef.close('update')
        },
        error:()=>{
          alert('Errors while update')
        }
      })

  }
}
