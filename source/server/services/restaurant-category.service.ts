import RestaurantCategory from "../../db/restaurant-category";

export class RestaurantCategoryService {

    /**
     * Service to find a restaurant category with a given id.
     * @param restaurantCategoryId
     */
    static findWithId(restaurantCategoryId: string) {
        return RestaurantCategory.findOne({_id: restaurantCategoryId});
    }
}
