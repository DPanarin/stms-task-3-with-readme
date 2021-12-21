import {ChangeDetectionStrategy, Component} from "@angular/core";

import {ROUTE_ANIMATIONS_ELEMENTS} from "../../../core/core.module";
import {OrdersDataService} from "../../../core/orders/orders-data.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {BehaviorSubject, combineLatest} from "rxjs";
import {Patient} from "../../../shared/models/patient.model";
import {finalize, map, startWith} from "rxjs/operators";
import {PatientsDataService} from "../../../core/patients/patients-data.service";
import {FavoritesService} from "../../../core/favorites/favorites.service";
import {SearchService} from "../../../core/search/search.service";
import {FavoriteItemType} from "../../../core/favorites/favorite-item-type.enum";
import {Order} from "../../../shared/models/order.model";

@Component({
    selector: "st-orders",
    templateUrl: "./orders.component.html",
    styleUrls: ["./orders.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent {
    routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
    searchControl: FormControl = this.builder.control('');

    readonly displayedColumns: string[] = ['orderName', 'creator', 'patient', 'isFavorite'];
    readonly isLoading$ = new BehaviorSubject<boolean>(false);
    readonly ordersList$ = new BehaviorSubject<Order[]>([]);
    readonly filteredOrdersList$ = combineLatest([
        this.ordersList$,
        this.searchControl.valueChanges.pipe(startWith('' as string))
    ]).pipe(map(([list, searchPhrase]) => {
        return this.searchService.search<Order>(list, searchPhrase, 'orderName')
    }));

    constructor(private readonly dataService: OrdersDataService,
                private readonly favoritesService: FavoritesService,
                private readonly builder: FormBuilder,
                private readonly searchService: SearchService) {
    }

    loadOrdersList() {
        this.isLoading$.next(true);
        this.dataService.getOrders()
            .pipe(finalize(() => this.isLoading$.next(false)))
            .subscribe(ordersList => {
                this.ordersList$.next(ordersList);
            })
    }

    isFavoriteOrder(order: Order) {
        return this.favoritesService.isFavorite({id: order.orderName, type: FavoriteItemType.Order});
    }

    changeOrderStatus(order: Order) {
        this.favoritesService.changeStatus({id: order.orderName, type: FavoriteItemType.Order});
    }
}
