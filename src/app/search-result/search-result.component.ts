import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  constructor(private mds: MusicDataService, private route: ActivatedRoute ) { }

  results: any;
  searchQuery: string | undefined; 
  searchSub: Subscription = new Subscription;

  ngOnInit(): void {

    this.searchSub = this.route.queryParams.subscribe( params => {
      this.searchQuery = params['q'];

      this.mds.searchArtists(this.searchQuery).subscribe( data => {
        this.results = data.artists.items.filter( item => item.images.length > 0);
      });

    });

  }

}
