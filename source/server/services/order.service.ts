import Order from "../../db/order.model";
import Restaurant from "../../db/restaurant.model";
import Deliverer from "../../db/deliverer.model";

export class OrderService {

    /**
     * Service to save an order.
     * @param order
     */
    static saveOrder(order: Order): Promise<Order> {
        return order.save();
    }

    /**
     * Service to find a order with a given id.
     * @param orderId
     */
    static findWithId(orderId: string) {
        return Order.findOne({_id: orderId}).populate(['restaurant', 'deliverer', 'items']);
    }

    /**
     * Service to find a order with a given id and restaurant.
     * @param orderId
     * @param restaurant
     */
    static findWithIdAndRestaurant(orderId: string, restaurant: Restaurant) {
        return Order.findOne({_id: orderId, restaurant: restaurant._id});
    }

    /**
     * Service to find a order with a given id and deliverer.
     * @param orderId
     * @param deliverer
     */
    static findWithIdAndDeliverer(orderId: string, deliverer: Deliverer) {
        return Order.findOne({_id: orderId, deliverer: deliverer._id});
    }

    /**
     * Service to find deliverer orders.
     * @param deliverer
     */
    static findWithDeliverer(deliverer: Deliverer) {
        return Order.find({deliverer: deliverer._id});
    }

    /**
     * Service to find orders for a restaurant.
     * @param restaurant
     */
    static findWithRestaurant(restaurant: Restaurant) {
        return Order.find({restaurant: restaurant._id});
    }

    /**
     * Service to find client orders.
     * @param clientId
     */
    static findWithClientId(clientId: string) {
        return Order.find({clientId: clientId}).populate(['items']);
    }

    static findOneWithClientIdAndI(clientId: string, orderId: string) {
        return Order.findOne({clientId: clientId, _id: orderId}).populate(['items']);
    }

    /**
     * Service to find orders by status and restaurant.
     * @param restaurant
     * @param status
     */
    static findWithRestaurantAndStatus(restaurant: Restaurant, status: number) {
        return Order.find({restaurant: restaurant._id, status: status});
    }

    /**
     * Service to find orders by status.
     */
    static findWithStatus(status: number) {
        return Order.find({status: status});
    }

}
