import Item from "../../db/item.model";
import Restaurant from "../../db/restaurant.model";

export class ItemService {

    /**
     * Service to save an item.
     * @param item
     */
    static saveItem(item: Item): Promise<Item> {
        return item.save();
    }

    /**
     * Service to find an item with id and restaurant
     * @param itemId
     * @param restaurant
     */
    static findWithIdAndRestaurant(itemId: string, restaurant: Restaurant) {
        return Item.findOne({_id: itemId, restaurant: restaurant._id});
    }

    /**
     * Service to delete an item with id and restaurant
     * @param itemId
     * @param restaurant
     */
    static deleteItem(itemId: string, restaurant: Restaurant) {
        return Item.deleteOne({_id: itemId, restaurant: restaurant._id});
    }

    /**
     * Service to find items for a restaurant
     * @param restaurant
     */
    static async findWithRestaurant(restaurant: Restaurant) {
        return Item.find({restaurant: restaurant._id});
    }
}
