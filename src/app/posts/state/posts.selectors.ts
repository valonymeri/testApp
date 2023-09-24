import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PostState} from "./product.reducer";

export const selectProductState = createFeatureSelector<PostState>('products');
/**
 * Select posts selector.
 */
export const selectPosts = createSelector(
  selectProductState,
  (postState) => postState.posts
)
/**
 * Select post loading status selector.
 */
export const selectPostLoading = createSelector(
  selectProductState,
  (postState) => postState.loading
)

/**
 * Select total records
 */
export const selectTotalRecords = createSelector(
    selectProductState,
    (postState) => postState.totalCount
)
/**
 * Select single post.
 */
export const selectSingle = createSelector(
    selectProductState,
    (postState) => postState.singlePost
)


export const selectPostErrorMessage = createSelector(
  selectProductState,
  (postState) => postState.errormessage
)
