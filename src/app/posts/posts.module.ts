import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {StoreModule} from "@ngrx/store";
import {postReducer} from "./state/product.reducer";
import {EffectsModule} from "@ngrx/effects";
import {ProductsEffects} from "./state/products.effects";
import {PostsComponent} from "./posts.component";
import {PostsRoutingModule} from "./posts-routing.module";
import { SinglePostComponent } from './single-post/single-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { AddPostComponent } from './add-post/add-post.component';

@NgModule({
  declarations: [
      PostsComponent,
      SinglePostComponent,
      EditPostComponent,
      AddPostComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule,

    StoreModule.forFeature('products', postReducer),
    EffectsModule.forFeature([ProductsEffects])
  ]
})
export class PostsModule { }
