import Deliverer from "../../db/deliverer.model";

export class DelivererService {

    /**
     * Service to find a order with a given user id.
     * @param userId
     */
    static findWithUserId(userId: string) {
        return Deliverer.findOne({userId: userId});
    }

}
