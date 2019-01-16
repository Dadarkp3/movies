import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../models/movie';
import { MovieService } from '../service/movie.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {

  public id: number;
  private sub: any;
  public movie: Movie = new Movie();
  public loading: boolean = false;

  constructor(private route: ActivatedRoute, public domSanitizer: DomSanitizer, private service: MovieService, private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => this.id = params['id']);
    this.searchMovieInfo();
  }
  searchMovieInfo() {
    this.loading = true;
    this.movie = new Movie();
    this.service.findMovieById(this.id).subscribe((response: Movie) => {
      this.movie = response;
      this.loading = false;
    });
  }
  
    moviePoster(moviePath: string): string{
    return (moviePath.length <= 3) ? '../../assets/img/no-image.png' : moviePath; 
  }

  getVideo(id){
    this.service.findTrailerbyMovieId(id).subscribe(response => {
      if(response.results && response.results[0])
      this.movie.trailer = 'https://www.youtube.com/embed/' + response.results[0].key;
    } );
  }

  convertingTime(x){
    let MINUTES = x;
    let m = MINUTES / 60;
    let h = (MINUTES-m)/60;
    return Math.round(h).toString() + ":" + (Math.round(m)<10?"0":"") + Math.round(m).toString()+ ':00';
  }

  convertingDolars(x)
    {
        if(x){
            return '$'+ x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ',00';    
        }
    }
}
