import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit, OnDestroy {

  constructor(private mds: MusicDataService) { }

  releases: Array<any> = [];
  dataSub: Subscription = new Subscription;

  ngOnInit(): void {
    this.dataSub = this.mds.getNewReleases().subscribe( data => {
      this.releases = data.albums.items;
    })
  }

  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }
}
