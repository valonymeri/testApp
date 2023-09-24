import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {selectPostLoading, selectPosts, selectTotalRecords} from "./state/posts.selectors";
import {PostPageActions} from "./state/product.actions";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  /**
   * All posts
   */
  posts$ = this.store.select(selectPosts);
  /**
   * Loading state.
   */
  loading$ = this.store.select(selectPostLoading);
  totalCount$ = this.store.select(selectTotalRecords);
  recordsPerPage = 12;
  totalPages = 0;
  currentPage = 1;
  constructor(  private store: Store) {
    this.posts$.subscribe(res=> {
      console.log(
          'post', res
      )
    });
    this.totalCount$.subscribe((totalCount$)=>{
      this.totalPages = Math.ceil(totalCount$ / this.recordsPerPage);
      console.log('meta', totalCount$);
    });
  }
  totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  goToPage(page: number): void {
    let limit = this.recordsPerPage;
    this.store.dispatch(PostPageActions.loadPosts({ page, limit }));
    this.currentPage = page;
  }

  search(event: any){
    console.log('event', event.target.value);
    let value = event.target.value
    this.store.dispatch(PostPageActions.searchPosts({keyword:value}));
  }
}
