import {ChangeDetectionStrategy, Component} from "@angular/core";

import {ROUTE_ANIMATIONS_ELEMENTS} from "../../../core/core.module";
import {PatientsDataService} from "../../../core/patients/patients-data.service";

@Component({
    selector: "st-patients",
    templateUrl: "./patients.component.html",
    styleUrls: ["./patients.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientsComponent {
    routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

    constructor(private readonly dataService: PatientsDataService) {
    }

    loadPatientsList() {
        this.dataService.getPatients().subscribe(patientsList => {
            console.log(patientsList);
        })
    }
}
