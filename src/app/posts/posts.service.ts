import {Injectable} from "@angular/core";
import {Apollo, gql} from "apollo-angular";
import {catchError, map, Observable, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Post} from "./post.model";
import {ApolloQueryResult} from "@apollo/client";
import {Posts} from "./posts.model";

@Injectable({
  providedIn: 'root'
})

export class PostsService{

  constructor(private apollo: Apollo)
  {}


  /**
   * Get All posts query.
   */
  getAllPosts(): Observable<ApolloQueryResult<{ posts: any[] }>> {
    const GET_POSTS = gql`
      query (
        $options: PageQueryOptions
      ) {
        posts(options: $options) {
          data {
            id
            title
          }
          meta {
            totalCount
          }
        }
      }
      `
    return this.apollo.watchQuery<{ posts: any[] }>({
      query: GET_POSTS
    }).valueChanges.pipe(catchError(this.handleError));
  };

  /**
   * Get Single post by id.
   * @param id
   */
  getSinglePost(id: any): Observable<any> {
    const GET_SINGLE_POST = gql`
      query GetSinglePost($postId: ID!) {
        post(id: $postId) {
          id
          title
          body
        }
      }
    `;
    return this.apollo.watchQuery<{ post: any }>({
      query: GET_SINGLE_POST,
      variables: { postId: id }, // Use the provided 'id' variable
    }).valueChanges.pipe(catchError(this.handleError));
  }

  /**
   * Update post by id.
   * @param id    Id which post to update.
   * @param input Data to be update.
   */
  updatePost(id: string, input: any) {
    const UPDATE_POST = gql`
      mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
        updatePost(id: $id, input: $input) {
          id
          body
          title
        }
      }
    `;
    return this.apollo.mutate({
      mutation: UPDATE_POST,
      variables: {
        id: id,
        input: input,
      },
    });
  }

  /**
   * Delete post by id
   * @param id Post id
   */
  delete(id: number) {
    const DELETE_POST = gql`
      mutation DeletePost($id: ID!) {
        deletePost(id: $id)
      }
    `;

    return this.apollo.mutate({
      mutation: DELETE_POST,
      variables: {
        id: id,
      },
    });
  }

  /**
   * Add post.
   * @param input Data for new post.
   */
  addPost(input: any) {
    const CREATE_POST = gql`
    mutation CreatePost($input: CreatePostInput!) {
      createPost(input: $input) {
        id
        title
        body
      }
    }
  `;

    return this.apollo.mutate({
      mutation: CREATE_POST,
      variables: {
        input: input,
      },
    }).pipe(
        map((response: any) => response.data) // Extract the created post data
    );
  }

  /**
   * error handler.
   * @param status
   * @private
   */
  private handleError({ status }: HttpErrorResponse) {
    return throwError(
      () => `${status}: Something bad happened.`
    );
  }

}
