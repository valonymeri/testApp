import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../post.model";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent {
  /**
   * Form group
   */
  myForm: FormGroup;
  /**
   * Store old post before updating.
   */
  oldPost:any = '';
  /**
   * Emit back on update.
   */
  @Output() update = new EventEmitter<Post>();
  /**
   * Emit back on delete.
   */
  @Output() delete = new EventEmitter<number>();

  /**
   * Input data for edit or delete.
   * @param post
   */
  @Input() set post(post: Post) {
    this.myForm.reset({title: '', body: ''});
    if (post){
      this.myForm.setValue({
        title: post.title,
        body: post.body,
      });
  }
    this.oldPost = post;
  }

  /**
   * Constructor. Initialize form.
   */
  constructor() {
    this.myForm =  new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
    });
  }

  /**
   * On Form submit for update.
   */
  onSubmit(){
    const formData = this.myForm.value;
    const post = {
      id: this.oldPost?.id,
      title: this.myForm.value.title,
      body: this.myForm.value.body,
    };
    this.update.emit(post)
  }
}
