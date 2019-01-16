import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieItemComponent } from './movie-item/movie-item.component';

const routes: Routes = [
  { path: 'home', component: MovieListComponent },
  { path: 'home/genre/:id', component: MovieListComponent },
  { path: '',
  redirectTo: '/home',
  pathMatch: 'full'
},
{path: 'movie/:id', component: MovieItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
