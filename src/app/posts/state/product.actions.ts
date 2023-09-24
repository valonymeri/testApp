import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {Post} from "../post.model";
import {Posts} from "../posts.model";

/**
 * Posts page actions.
 */
export const PostPageActions = createActionGroup({
  source: 'Products Page',
  events: {
    'Load Posts': emptyProps,
    'Load Single Post':props<{id: any }>(),
    'Update Post': props<{post: Post }>(),
    'Delete Post': props<{id: number }>(),
    'Add Post': props<{post: Post }>(),


  }
});

/**
 * Post api actions.
 */
export const PostAPIActions = createActionGroup({
  source: 'Products API',
  events:{
    'Posts Loaded Success': props<{post: Post[]}>(),
    'Single Posts Loaded Success': props<{post: Post}>(),
    'Post Update Success': props<{post: Post}>(),
    'Post Delete Success': props<{id: number}>(),
    'Post Added Success': props<{post: Post}>(),
    'Post Added Fail': props<{message: string}>(),
    'Post Update Fail': props<{message: string}>(),
    'Post Loaded Fail': props<{message: string}>(),
    'Post Delete Fail': props<{message: string}>(),
  }
})
