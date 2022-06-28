import Restaurant from "../../db/restaurant.model";

export class RestaurantService {

    /**
     * Service to find a restaurant with a given user id.
     * @param userId
     */
    static findWithUserId(userId: string) {
        return Restaurant.findOne({userId: userId});
    }

    /**
     * Service to save a restaurant.
     * @param restaurant
     */
    static saveRestaurant(restaurant: Restaurant): Promise<Restaurant> {
        return restaurant.save();
    }

}
