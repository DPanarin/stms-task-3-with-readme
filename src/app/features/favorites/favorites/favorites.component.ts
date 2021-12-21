import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FavoritesService} from "../../../core/favorites/favorites.service";

@Component({
    selector: 'st-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent implements OnInit {

    constructor(private readonly favoritesService: FavoritesService) {
    }

    ngOnInit(): void {
    }
}
