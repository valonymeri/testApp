import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {selectPosts} from "./state/posts.selectors";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  posts$ = this.store.select(selectPosts);


  constructor(  private store: Store) {
   // this.a.posts
    this.posts$.subscribe(res=> {

    })
  }

  async  asyncCall() {

  }
}
