import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private movieUrl = 'http://www.omdbapi.com/?apikey=';
	private movieUrlSearch = 'http://api.themoviedb.org/3/search/movie?api_key=ba06e9d5914aec7bf90de97e78a8b482&query=';
	private apiKey = '477f8be0';

  constructor(private http: HttpClient) { }

  searchMovies(query: string, page: number): Observable<any> {
    return  this.http.get<any>(this.movieUrl + this.apiKey + '&s=' + query + '&page=' + page);
  }

  searchGenre(){
    return this.http.get('https://api.themoviedb.org/3/genre/movie/list?api_key='+ this.apiKey +'&language=pt-BR');
  }

  searchMovieByYear(year, page:number): Observable<any>{
    return this.http.get<any>('https://api.themoviedb.org/3/discover/movie?api_key='+ this.apiKey +'&primary_release_year=' + year + '&page=' + page + '&language=pt-BR');
  }

  searchMovieByGenre(genre, page:number): Observable<any>{
    return this.http.get<any>('https://api.themoviedb.org/3/discover/movie?api_key='+ this.apiKey +'&with_genres=' + genre + '&page=' + page + '&language=pt-BR');
  }

  findMovieById(id: number){
    return this.http.get<any>(this.movieUrl + this.apiKey+'&i='+id);
  }

  findTrailerbyMovieId(id: number){
    return this.http.get<any>('https://api.themoviedb.org/3/movie/'+ id +'/videos?api_key='+ this.apiKey +'&language=pt-BR');
  }


}
