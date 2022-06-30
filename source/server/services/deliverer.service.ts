import Deliverer from "../../db/deliverer.model";

export class DelivererService {

    /**
     * Service to find a deliverer with a given user id.
     * @param userId
     */
    static findWithUserId(userId: string) {
        return Deliverer.findOne({userId: userId});
    }

    /**
     * Service to find a deliverer with a given id.
     * @param restaurantId
     */
    static findWithId(restaurantId: string) {
        return Deliverer.findOne({_id: restaurantId});
    }

    /**
     * Service to save a deliverer.
     * @param restaurant
     */
    static saveDeliverer(restaurant: Deliverer): Promise<Deliverer> {
        return restaurant.save();
    }

    /**
     * Service to find all deliverers.
     */
    static findAll() {
        return Deliverer.find({});
    }
}
