import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostsComponent} from "./posts.component";
import {SinglePostComponent} from "./single-post/single-post.component";
import {AddPostComponent} from "./add-post/add-post.component";

const routes: Routes = [
  {
    path: '',
    component: PostsComponent
  },
  {
    path: 'add',
    component: AddPostComponent
  },
  {
    path: ':id',
    component: SinglePostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
