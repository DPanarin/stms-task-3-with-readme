import {ChangeDetectionStrategy, Component} from "@angular/core";

import {ROUTE_ANIMATIONS_ELEMENTS} from "../../../core/core.module";
import {PatientsDataService} from "../../../core/patients/patients-data.service";
import {BehaviorSubject, combineLatest} from "rxjs";
import {Patient} from "../../../shared/models/patient.model";
import {finalize, map, startWith} from "rxjs/operators";
import {FavoritesService} from "../../../core/favorites/favorites.service";
import {FavoriteItemType} from "../../../core/favorites/favorite-item-type.enum";
import {FormBuilder, FormControl} from "@angular/forms";
import {SearchService} from "../../../core/search/search.service";

@Component({
    selector: "st-patients",
    templateUrl: "./patients.component.html",
    styleUrls: ["./patients.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientsComponent {
    routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
    searchControl: FormControl = this.builder.control('');

    readonly displayedColumns: string[] = ['fullName', 'birthDate', 'code', 'defaultId', 'isFavorite'];
    readonly isLoading$ = new BehaviorSubject<boolean>(false);
    readonly patientsList$ = new BehaviorSubject<Patient[]>([]);
    readonly filteredPatientList$ = combineLatest([
        this.patientsList$,
        this.searchControl.valueChanges.pipe(startWith('' as string))
    ]).pipe(map(([list, searchPhrase]) => {
        return this.searchService.search<Patient>(list, searchPhrase, 'firstName')
    }));

    constructor(private readonly dataService: PatientsDataService,
                private readonly favoritesService: FavoritesService,
                private readonly builder: FormBuilder,
                private readonly searchService: SearchService) {
    }

    loadPatientsList() {
        this.isLoading$.next(true);
        this.dataService.getPatients()
            .pipe(finalize(() => this.isLoading$.next(false)))
            .subscribe(patientsList => {
                this.patientsList$.next(patientsList);
            })
    }

    isFavoritePatient(patient: Patient) {
        return this.favoritesService.isFavorite({id: patient.defaultId, type: FavoriteItemType.Patient});
    }

    changePatientStatus(patient: Patient) {
        this.favoritesService.changeStatus({id: patient.defaultId, type: FavoriteItemType.Patient});
    }
}
