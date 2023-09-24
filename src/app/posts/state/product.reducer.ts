import { createReducer, on} from "@ngrx/store";
import {PostAPIActions, PostPageActions} from "./product.actions";
import {Post} from "../post.model";

/**
 * Post state interface.
 */
export interface PostState {
  loading: boolean;
  posts: Post[];
  singlePost: any,
  errormessage: string;
}

/**
 * Post Initial state.
 */
const initialState: PostState ={
  loading: false,
  posts: [],
  singlePost: '',
  errormessage: ''
}
/**
 * Reduce5r
 */
export const postReducer = createReducer(
  initialState,
    on(PostPageActions.loadSinglePost, (state) => {
      return {
          ...state,
          loading: true,
          singlePost: null,
    }}),
    on(PostAPIActions.singlePostsLoadedSuccess, (state, {post}) =>{
      return {
          ...state,
          loading: false,
          post:state.posts.map((existingPost) => existingPost.id === post.id ? post : existingPost),
          singlePost: post,
      }
    }),
    on(PostPageActions.updatePost, (state) =>{
    return {
        ...state,
        loading: true,
        errormessage: ''
    }}),
    on(PostAPIActions.postUpdateSuccess, (state, {post}) => {
        return {
        ...state,
        loading: false,
        post:state.posts.map((existingPost) => existingPost.id === post.id ? post : existingPost)
    }}),
    on(PostPageActions.deletePost, (state) =>({
        ...state,
        loading: true,
        errormessage: ''
    })),
    on(PostAPIActions.postDeleteSuccess, (state, {id}) =>{
    return{
        ...state,
        loading: false,
        posts:state.posts.filter((existingPost) => +existingPost.id !== +id)
    }}),
    on(PostPageActions.addPost, (state) =>({
        ...state,
        loading: true,
        errormessage: ''
    })),
    on(PostAPIActions.postAddedSuccess, (state, {post}) =>
        {
        return {
        ...state,
        loading: false,
        posts: [...state.posts, post]
    }}),
    on(PostAPIActions.postAddedFail, (state, {message}) =>({
        ...state,
        loading: false,
        errormessage: message
    })),
    on(PostAPIActions.postUpdateFail, (state, {message}) =>({
        ...state,
        loading: false,
        errormessage: message
    })),
    on(PostPageActions.loadPosts, (state) => ({
      ...state,
      loading: true,
      posts: [],
    })),
    on(PostAPIActions.postsLoadedSuccess, (state, {post}) => {
      return {
        ...state,
        loading: false,
        posts: post
      };
    }),

  on(PostAPIActions.postLoadedFail, (state, {message}) =>({
    ...state,
    products: [],
    errormessage: message,
    loading: false
  })),

)

