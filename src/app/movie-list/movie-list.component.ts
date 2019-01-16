import { Component, OnInit } from '@angular/core';
import { MovieService } from '../service/movie.service';
import { Movie } from '../models/movie';
import { DOCUMENT } from '@angular/platform-browser';
import { Inject} from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  public movieInput: string = '';
  public movieGenre: any;
  public movies: Movie[] = [];
  public currentPage: number = 1;
  public pageSize;
  public genreId: string;
  public total;
  public loading: boolean = false;
  public id: number;
  private sub: any;
  public totalResults = 0;
  public page: number = 0;
  

  constructor(private route: ActivatedRoute, private service: MovieService, @Inject(DOCUMENT) private document: Document, private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => this.id = params['id']);
  }

  checkMovies(){
    console.log(this.movies);
    return this.movies && this.movies.length > 0 ;
  }

  searchMovies(searchInput, currentPage){
    this.loading = true;
    this.movies = [];
    this.page = currentPage;
      this.service.searchMovies(searchInput, currentPage).subscribe((response) => {
        this.movies = response.Search;
        this.loading = false;
        this.totalResults = response.totalResults;
        this.pageSize = response.totalResults;
      });
  }

  moviePoster(moviePath: string): string{
    return (moviePath.length <= 3) ? '../../assets/img/no-image.png' : moviePath; 
  }

  getPage(page: number){
    this.loading = true;
    this.movies = [];
    this.totalResults = 0;
    this.service.searchMovies(this.movieInput, page).subscribe((response) => {
      this.movies = response.Search;
      this.loading = false;
      this.totalResults = response.totalResults;
      this.pageSize = response.totalResults;
      this.page = page;
    });
  }

  genreService(genreId, page){
    this.service.searchMovieByGenre(genreId, page).subscribe(response => {
      this.prepareData(response);
    });
  }

  checkYearService(searchInput): boolean {
    return !isNaN(Number(searchInput))
  }

  checkGenreService(): boolean {
    let validation = false;
    this.movieGenre.genres.forEach(element => {
      if(this.movieInput.toLowerCase() == element.name.toLowerCase()){
        this.genreId = element.id;
        validation = true;
      }
    }); 
    return validation; 
  }

  prepareData(response){
    this.movies = [];
        response.results.forEach(element => {
        let movie = new Movie();
        movie.id = element.id;
        movie.title = element.title;
        if(element.release_date !== ""){
          movie.releaseDate = new Date(element.release_date);
        }
        if(element.poster_path !== null){
          movie.posterPath = "http://image.tmdb.org/t/p/w185" + element.poster_path;
        }else
        {
          movie.posterPath = '../../assets/img/no-image.png'
        }
        movie.popularity = element.vote_average/10;
        movie.overview = element.overview;
        if(element.genre_ids !== []){
          element.genre_ids.map( num => this.checkGenre(num, movie));
        }
        this.movies.push(movie);
      });
      this.pageSize = this.movies.length;
      this.movieInput = '';
      this.loading = false;
      this.moveTop();
  }

  checkGenre(num, movie: Movie){
    this.movieGenre.genres.forEach(numero => {
      if(numero.id == num){
        
      }
    });
  }

  searchGenre(){
    this.service.searchGenre().subscribe(response => {
        this.movieGenre = response;
    });  
  }

  openMovie(id: string){
    this.router.navigate(['/movie', id]);
  }

  moveTop(){
    this.document.documentElement.scrollTop = 0;
    window.scroll(0,0);
    window.scrollTo(0,0);
  }

}
