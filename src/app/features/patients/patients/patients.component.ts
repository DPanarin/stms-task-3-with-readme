import {ChangeDetectionStrategy, Component} from "@angular/core";

import {ROUTE_ANIMATIONS_ELEMENTS} from "../../../core/core.module";
import {PatientsDataService} from "../../../core/patients/patients-data.service";
import {BehaviorSubject} from "rxjs";
import {Patient} from "../../../shared/models/patient.model";
import {finalize} from "rxjs/operators";

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

    constructor(private readonly dataService: PatientsDataService) {
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
        return false;
    }
}
