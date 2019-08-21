import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Coffee } from '../logic/coffee';
import {Router} from '@angular/router';
import {GeolocationService} from '../geolocation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  list: Coffee[];

  constructor(private _dataService: DataService,
              private _geolocationService: GeolocationService,
              private  _router: Router) { }

  ngOnInit() {
    this._dataService.getList( list => {
      this.list = list;
    });
  }

  goDetails(coffee: Coffee) {
    this._router.navigate(['/coffee', coffee._id]);
  }

  goMap(coffee: Coffee) {
    location.href = this._geolocationService.getMapLink(coffee.location);
  }

  share(coffee: Coffee) {
    const shareText = `I have this coffee at ${coffee.place} and for me it's a ${coffee.rating} starr coffee`;
    if ('share' in navigator) {
      // navigator.share({
      // navigator['share']({
      (navigator as any).share({
        title: coffee.name,
        text: shareText,
        url: window.location.href
      }).then( () => console.log('shared')).catch( () => console.log('error sharing'));
    } else {
      const shareURL = `whatsapp://send?text=${encodeURIComponent(shareText)}`;
      location.href = shareURL;
    }
  }
}
