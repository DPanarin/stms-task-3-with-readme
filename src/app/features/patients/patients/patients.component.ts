import {ChangeDetectionStrategy, Component} from "@angular/core";

import {ROUTE_ANIMATIONS_ELEMENTS} from "../../../core/core.module";
import {PatientsDataService} from "../../../core/patients/patients-data.service";
import {BehaviorSubject} from "rxjs";
import {Patient} from "../../../shared/models/patient.model";
import {finalize} from "rxjs/operators";
import {FavoritesService} from "../../../core/favorites/favorites.service";
import {FavoriteItemType} from "../../../core/favorites/favorite-item-type.enum";

@Component({
    selector: "st-patients",
    templateUrl: "./patients.component.html",
    styleUrls: ["./patients.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientsComponent {
    routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

    readonly patientsList$ = new BehaviorSubject<Patient[]>([]);
    readonly displayedColumns: string[] = ['fullName', 'birthDate', 'code', 'defaultId', 'isFavorite'];
    readonly isLoading$ = new BehaviorSubject<boolean>(false);

    constructor(private readonly dataService: PatientsDataService, private readonly favoritesService: FavoritesService) {
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
