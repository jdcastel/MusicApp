import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnDestroy {

  constructor(private snackBar: MatSnackBar, private route: ActivatedRoute, private mds: MusicDataService) { }

  album: any;
  albumSub: Subscription = new Subscription;

  ngOnInit(): void {
    this.albumSub = this.route.params.subscribe( params => {
      this.mds.getAlbumById(params['id']).subscribe( data => {
        this.album = data;
      });

    });
  }

  addToFavourites(trackID: any){

    this.mds.addToFavourites(trackID).subscribe( data => {
      this.snackBar.open('Adding to Favourites...', 'Done', {duration: 1500});
    }, err => {
      this.snackBar.open('Unable to add song to Favourites', 'Done', {duration: 1500});
    });
  }

  ngOnDestroy(): void {
    this.albumSub.unsubscribe();
  }
}
