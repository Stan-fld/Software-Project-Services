import Item from "../../db/item.model";
import Restaurant from "../../db/restaurant.model";

export class ItemService {

    /**
     * Service to find multiple items with a given ids and restaurant.
     * @param itemId
     * @param restaurant
     */
    static findWithIdsAndRestaurant(itemId: string, restaurant: Restaurant) {
        return Item.findOne({_id: itemId, restaurant: restaurant._id});
    }
}
