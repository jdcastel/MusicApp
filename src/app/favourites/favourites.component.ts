import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit, OnDestroy {

  constructor(private snackBar: MatSnackBar, private mds: MusicDataService) { }

  favourites: Array<any> = [];
  favouritesSub: Subscription = new Subscription;

  ngOnInit(): void {
    this.favouritesSub = this.mds.getFavourites().subscribe( data => {
      this.favourites = data.tracks;
    })
  }

  removeFromFavourites(id: any) {
    this.mds.removeFromFavourites(id).subscribe( data => {
      this.favourites = data.tracks;
      this.snackBar.open("Removing from Favourites...", "Done", { duration: 1500 });
    });
  }

  ngOnDestroy(): void {
    this.favouritesSub.unsubscribe();
  }
}
