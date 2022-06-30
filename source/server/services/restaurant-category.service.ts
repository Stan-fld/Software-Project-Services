import RestaurantCategory from "../../db/restaurant.category.model";


export class RestaurantCategoryService {

    /**
     * Service to find a restaurant category with a given id.
     * @param restaurantCategoryId
     */
    static findWithId(restaurantCategoryId: string) {
        return RestaurantCategory.findOne({_id: restaurantCategoryId});
    }

    /**
     * Service to find all restaurant categories.
     */
    static findAll(){
        return RestaurantCategory.find({});
    }
}
