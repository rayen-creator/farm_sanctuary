import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Comment } from 'src/app/core/models/comment';
import { CommentService } from 'src/app/core/services/comment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment:Comment;
  @Input() id:string;
  @Input() userId:string;
  c:Comment;
  isEditmode: boolean=false ;
  updateCommentForm: FormGroup;

  constructor(
    private commentService: CommentService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {

  }
 

  deleteComment(id: any,userId:any) {
    Swal.fire({
      title: 'Are you sure you want to delete this comment ?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.commentService.deleteComment(id, this.id,userId);
        // Swal.fire('deleted', 'article has been created successfully.', 'success');
      }
    });
  }
  private initForm() {
    this.updateCommentForm = this.formBuilder.group({
      content: [this.c.content]
    });
  }
  updateComment(form: any, id: any) {
    this.commentService.updateComment(form, id, this.id).subscribe({
      next: () => {
        this.isEditmode = false;
        this.toastr.success('comment updated successfully', 'Success', {
          progressBar: true
        });
      }, error: (err) => {
        throw err;
      }
    });

  }
  editcomment(id: any) {

    this.commentService.getcommentbyid(id).subscribe({
      next: (obj: any) => {
        this.c = obj;
        this.initForm();
        this.isEditmode = true;

      }, error: (err) => {
        throw err;
      }
    })
    // this.commentService.editComment(this.id, this.commentForm.controls['content'].getValue());
  }
  cancelEdit() {
    this.isEditmode = false;
  }

}
