import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PostAPIActions, PostPageActions} from "./product.actions";
import {catchError, concatMap, exhaustMap, map, mergeMap, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {PostsService} from "../posts.service";
import {resolve} from "@angular/compiler-cli";

@Injectable()
export class ProductsEffects{

    /**
     * Load posts on ngrxOnInitEffects.
     */
  ngrxOnInitEffects(){
    return PostPageActions.loadPosts();
  }

    /**
     * Load all posts.
     */
  loadPosts$ = createEffect(():any =>
    this.actions$.pipe(
      ofType(PostPageActions.loadPosts),
      mergeMap(() =>
        this.postsService.getAllPosts().pipe(
            map((result: any) => {
                if (result.data && result.data.posts) {
                    return PostAPIActions.postsLoadedSuccess({ post: result.data.posts.data });
                } else {
                    throw new Error('Invalid GraphQL response format');
                }
            }),   catchError(
                (error) => of(PostAPIActions.postLoadedFail({ message: error}))
            )
          ))
    )
  )

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
