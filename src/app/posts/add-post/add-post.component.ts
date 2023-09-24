import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {Post} from "../post.model";
import {PostPageActions} from "../state/product.actions";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent {
  /**
   * Form for adding post.
   */
  addPostForm:FormGroup;

  /**
   *
   * @param store NgrxStore
   * Initialize form.
   */
  constructor(private store: Store) {
    this.addPostForm =  new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
    });
  }

  /**
   * On submit adds post.
   */
  onSubmit(){
    const formData = this.addPostForm.value;
    const post = {
      id: '0',
      title: this.addPostForm.value.title,
      body: this.addPostForm.value.body,
    };

      this.store.dispatch(PostPageActions.addPost({post}));
    // this.update.emit(post)
  }
}
