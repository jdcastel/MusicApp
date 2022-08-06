import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {

  constructor(private mds: MusicDataService, private route: ActivatedRoute ) { }

  albums: Array<any> = [];
  artist: any;
  paramSub: Subscription = new Subscription;

  ngOnInit(): void {

    this.paramSub = this.route.params.subscribe(params => {
      
      this.mds.getArtistById(params['id']).subscribe( data => {
        this.artist = data;
      });

      this.mds.getAlbumsByArtistId(params['id']).subscribe( data =>{
        this.albums = data.items.filter((item, index) => 
        data.items.findIndex((item2) => 
        item2.name.toUpperCase() === item.name.toUpperCase()) === index);
      });

    });

  }

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
  }
}
