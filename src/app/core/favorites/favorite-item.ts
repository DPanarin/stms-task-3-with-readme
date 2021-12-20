import {FavoriteItemType} from "./favorite-item-type.enum";

export interface FavoriteItem {
    readonly id: string;
    readonly type: FavoriteItemType;
}
