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
     * Service to find a restaurant with a given id.
     * @param restaurantId
     */
    static findWithId(restaurantId: string) {
        return Restaurant.findOne({_id: restaurantId});
    }
}
