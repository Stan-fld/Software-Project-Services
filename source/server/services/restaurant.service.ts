import Restaurant from "../../db/restaurant.model";
import {restauStatus} from "../../config/enums";

export class RestaurantService {

    /**
     * Service to find a restaurant with a given user id.
     * @param userId
     */
    static findWithUserId(userId: string) {
        return Restaurant.findOne({userId: userId});
    }

    /**
     * Service to find a restaurant with a given id.
     * @param restaurantId
     */
    static findWithId(restaurantId: string) {
        return Restaurant.findOne({_id: restaurantId});
    }

    /**
     * Service to save a restaurant.
     * @param restaurant
     */
    static saveRestaurant(restaurant: Restaurant): Promise<Restaurant> {
        return restaurant.save();
    }

    /**
     * Service to find all restaurants opened.
     */
    static findWithStatus(status: string = restauStatus.opened) {
        return Restaurant.find({status: status});
    }

    /**
     * Service to find all restaurants.
     */
    static findAll() {
        return Restaurant.find({});
    }
}
