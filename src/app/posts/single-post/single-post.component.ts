import {Component, OnInit} from '@angular/core';
import {PostAPIActions, PostPageActions} from "../state/product.actions";
import {
  selectPostLoading,
  selectPosts,
  selectPostErrorMessage,
  selectSingle
} from "../state/posts.selectors";
import {Store} from "@ngrx/store";
import {Post} from "../post.model";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit{
  /**
   * Is loading
   */
  loading$ = this.store.select(selectPostLoading);
  /**
   * Stored single post. ( The one that is created);
   */
  singlePost$ = this.store.select(selectSingle);
  /**
   * Error messages.
   */
  errorMessage$ = this.store.select(selectPostErrorMessage);
  /**
   * Edit mode for post.
   */
  editMode = false;
  posts$ = this.store.select(selectPosts);
  newPost:any= '';

  /**
   *
   * @param store Ngrx store
   * @param actions$ Ngrx actions
   * @param route  Activated route
   * @param formBuilder Form Builder
   */
  constructor(  private store: Store,  private actions$: Actions,  private route: ActivatedRoute, private formBuilder: FormBuilder) {
  }

  /**
   * Get single posts on Init.
   */
  ngOnInit() {
    let id =  this.route.snapshot.params['id'];
    this.store.dispatch(PostPageActions.loadSinglePost({ id }));
    //If you navigate to newly created post. store it in newPosts
    this.posts$.subscribe((post)=>{
      let item = post.find(post => post.id === id);
      if(item  && item.body){
        this.newPost = item;
      }
    })
  }

  /**
   * Edit mode on.
   */
  editPost(){
    this.editMode = true;
  }

  /**
   * Update Post
   * @param post
   */
  updatePost(post: Post) {
    this.store.dispatch(PostPageActions.updatePost({post}));
    this.editMode = false;
  }

  /**
   * Delete Post
   * @param id
   */
  deletePost(id: number) {
    this.store.dispatch(PostPageActions.deletePost({id}));
  }
}
