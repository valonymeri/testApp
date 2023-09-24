import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PostAPIActions, PostPageActions} from "./product.actions";
import {catchError, concatMap, exhaustMap, map, mergeMap, of, switchMap, tap} from "rxjs";
import {Router} from "@angular/router";
import {PostsService} from "../posts.service";
import {resolve} from "@angular/compiler-cli";
import {Post} from "../post.model";

@Injectable()
export class ProductsEffects{

    /**
     * Load posts on ngrxOnInitEffects.
     */
  ngrxOnInitEffects(){
    return PostPageActions.loadPosts({page:1, limit:12});
  }


    /**
     * Load all posts then search.
     */
    searchPosts = createEffect(():any =>
        this.actions$.pipe(
            ofType(PostPageActions.searchPosts),
            mergeMap(({ keyword }) =>
                this.postsService.searchAllPosts(keyword).pipe(
                    map((result: any) => {
                            let foundItem:Post[] =result.data.posts.data;
                            const res:Post[] = result.data.posts.data;
                            if(keyword) {
                                let item = res.find(word => word.title === keyword);
                                const defaultPost: Post[] = [{
                                    id: '0',
                                    title: 'No Post found',
                                    body: 'This is a default post.',
                                }];
                                foundItem = item ? [item] : defaultPost;
                            }
                            return PostAPIActions.postsSearchSuccess({ post: foundItem });
                    }),   catchError(
                        (error) => of(PostAPIActions.postLoadedFail({ message: error}))
                    )
                ))
        )
    )


    /**
     * Load all posts.
     */
    loadPosts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostPageActions.loadPosts),
            mergeMap(({ page, limit }) =>
                this.postsService.getAllPosts(page, limit).pipe(
                    map((result: any) => {
                        if (result.data && result.data.posts) {
                            return PostAPIActions.postsLoadedSuccess({ post: result.data.posts.data, totalCount:result.data.posts.meta.totalCount });
                        } else {
                            throw new Error('Invalid GraphQL response format');
                        }
                    }),
                    catchError((error) => of(PostAPIActions.postLoadedFail({ message: error })))
                )
            )
        )
    );

    /**
     * Load single post.
     */
    loadSinglePost$ = createEffect(():any =>
        this.actions$.pipe(
            ofType(PostPageActions.loadSinglePost),
            mergeMap((action) =>
                this.postsService.getSinglePost(action.id).pipe(
                    map((result: any) => {

                            return PostAPIActions.singlePostsLoadedSuccess({ post: result.data.post });
                    }),
                         catchError(
                    (error) => of(PostAPIActions.postLoadedFail({ message: error}))
                    )
                ))
        )
    )

    /**
     * Update Product.
     */
    updateProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostPageActions.updatePost),
            concatMap(({post}) =>
                this.postsService.updatePost(post.id, {body: post.body, title: post.title}).pipe(
                    map((res) => {
                      return  PostAPIActions.postUpdateSuccess({post});
                    }),
                    catchError(
                        (error) => of(PostAPIActions.postUpdateFail({ message: error}))
                    )
                ))
        )
    )

    /**
     * Delete Product.
     */
    deleteProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostPageActions.deletePost),
            mergeMap(({id}) =>
                this.postsService.delete(id).pipe(
                    map(() =>
                        PostAPIActions.postDeleteSuccess({id})),
                    catchError(
                        (error) => of(PostAPIActions.postDeleteFail({ message: error}))
                    )
                ))
        )
    );

    /**
     * Add Product.
     */
    addProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostPageActions.addPost),
            mergeMap(({post}) =>
                this.postsService.addPost({body:post.body, title: post.title}).pipe(
                    map((newPost) =>{
                        return PostAPIActions.postAddedSuccess({post: newPost.createPost});
}),
                    catchError(
                        (error) => of(PostAPIActions.postAddedFail({ message: error}))
                    )
                ))
        )
    )

    /**
     * Redirect to product page on success.
     */
    redirectToProductsPage = createEffect(
        () => this.actions$.pipe(
            ofType(
                PostAPIActions.postAddedSuccess,
                PostAPIActions.postDeleteSuccess
            ),
            tap(() => this.router.navigate(['/posts']))
        ),
        {dispatch: false}
    )

    /**
     *
     * @param actions$
     * @param postsService
     * @param router
     */
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private router: Router
  ) {

  }


}
