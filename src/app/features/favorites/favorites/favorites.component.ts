import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FavoritesService} from "../../../core/favorites/favorites.service";
import {combineLatest} from "rxjs";
import {PatientsDataService} from "../../../core/patients/patients-data.service";
import {map, startWith} from "rxjs/operators";
import {FavoriteItemType} from "../../../core/favorites/favorite-item-type.enum";

@Component({
    selector: 'st-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent {
    readonly favoriteItemType = FavoriteItemType;
    readonly patientDisplayedColumns: string[] = ['fullName', 'birthDate', 'code', 'defaultId', 'removeFromFavorites'];
    readonly patientsList$ = combineLatest([
        this.patientsDataService.getPatients(),
        this.favoritesService.favoritesChanged.pipe(startWith(FavoriteItemType.Patient))
    ]).pipe(map(([patientsList, favoritesType]) => {
        return patientsList.filter(patient => this.favoritesService.isFavorite({
            id: patient.defaultId,
            type: FavoriteItemType.Patient
        }))
    }));

    constructor(private readonly favoritesService: FavoritesService,
                private readonly patientsDataService: PatientsDataService) {
    }

    removeFromFavorites(itemId: string, itemType: FavoriteItemType) {
        this.favoritesService.changeStatus({id: itemId, type: itemType});
    }
}
