import Restaurant from "../../db/restaurant.model";
import {RestaurantService} from "../services/restaurant.service";
import {createError, mongooseErrors} from "../errors/errors";
import {Role} from "../../models/role.model";
import {orderStatus, roles} from "../../config/enums";
import Order, {IOrder} from "../../db/order.model";
import {OrderService} from "../services/order.service";
import {User} from "../../models/user.model";
import {DelivererService} from "../services/deliverer.service";
import Deliverer from "../../db/deliverer.model";


export class OrderController {

    /**
     * Controller to create a order
     * @param body
     * @param role
     */
    static async createOrder(body: IOrder, role: Role) {
        try {

            let restaurant: Restaurant = await RestaurantService.findWithId(body.restaurantId);

            if (restaurant) {
                return createError('RestaurantAlreadyExists', 'Restaurant already exists for this user', 400);
            }

            if (role.name !== roles.client) {
                return createError('InvalidRole', 'Invalid role', 400);
            }

            body.restaurant = restaurant;
            body.status = orderStatus.pending;
            body.deliverer = null;
            const order: Order = await OrderService.saveOrder(new Order(body));

            return {data: order, code: 200};

        } catch (e) {
            return mongooseErrors(e);
        }
    }

    /**
     * Controller to accept an order for a restaurant
     * @param user
     * @param orderId
     */
    static async restaurantAcceptOrder(user: User, orderId: string) {
        try {
            const restaurant = await RestaurantService.findWithUserId(user.id);

            if (!restaurant) {
                return createError('CannotFindRestaurant', 'Cannot find your restaurant', 404);
            }

            let order: Order = await OrderService.findWithIdAndRestaurant(orderId, restaurant);

            if (!order) {
                return createError('CannotFindOrder', 'Cannot find your order', 404);
            }

            order.status = orderStatus.inProgress;
            order = await OrderService.saveOrder(order);

            return {data: order, code: 200};

        } catch (e) {
            return mongooseErrors(e);
        }
    }

    /**
     * Controller to accept an order for a deliverer
     * @param user
     * @param orderId
     */
    static async delivererAcceptOrder(user: User, orderId: string) {
        try {
            const deliverer: Deliverer = await DelivererService.findWithUserId(user.id);

            if (!deliverer) {
                return createError('CannotFindDeliverer', 'Cannot find your deliverer account', 404);
            }

            let order: Order = await OrderService.findWithId(orderId);

            if (!order) {
                return createError('CannotFindOrder', 'Cannot find your order', 404);
            }

            order.status = orderStatus.inDelivery;
            order.deliverer = deliverer;
            order = await OrderService.saveOrder(order);

            return {data: order, code: 200};

        } catch (e) {
            return mongooseErrors(e);
        }
    }

    /**
     * Controller to finish an order
     * @param user
     * @param orderId
     */
    static async orderDelivered(user: User, orderId: string) {
        try {
            const deliverer: Deliverer = await DelivererService.findWithUserId(user.id);

            if (!deliverer) {
                return createError('CannotFindDeliverer', 'Cannot find your deliverer account', 404);
            }

            let order: Order = await OrderService.findWithIdAndDeliverer(orderId, deliverer);

            if (!order) {
                return createError('CannotFindOrder', 'Cannot find your order', 404);
            }

            order.status = orderStatus.delivered;
            order = await OrderService.saveOrder(order);

            return {data: order, code: 200};

        } catch (e) {
            return mongooseErrors(e);
        }
    }

    /**
     * Controller to get all orders for restaurant
     * @param user
     */
    static async getRestaurantOrders(user: User) {
        try {
            const restaurant: Restaurant = await RestaurantService.findWithUserId(user.id);

            if (!restaurant) {
                return createError('CannotFindRestaurant', 'Cannot find your restaurant', 404);
            }

            const orders: Order[] = await OrderService.findWithRestaurant(restaurant);

            return {data: orders, code: 200};

        } catch (e) {
            return mongooseErrors(e);
        }
    }

    static async getRestaurantPendingOrders(user: User) {
        try {
            const restaurant: Restaurant = await RestaurantService.findWithUserId(user.id);

            if (!restaurant) {
                return createError('CannotFindRestaurant', 'Cannot find your restaurant', 404);
            }

            const orders: Order[] = await OrderService.findWithRestaurantAndStatus(restaurant, orderStatus.pending);

            return {data: orders, code: 200};

        } catch (e) {
            return mongooseErrors(e);
        }
    }

    /**
     * Controller to get all orders in progress for deliverer
     * @param user
     */
    static async getDelivererInProgressOrders(user: User) {
        try {
            const deliverer: Deliverer = await DelivererService.findWithUserId(user.id);

            if (!deliverer) {
                return createError('CannotFindDeliverer', 'Cannot find your deliverer account', 404);
            }

            const orders: Order[] = await OrderService.findWithStatus(orderStatus.inProgress);

            return {data: orders, code: 200};

        } catch (e) {
            return mongooseErrors(e);
        }
    }

    /**
     * Controller to get all orders for a deliverer
     * @param user
     */
    static async getDelivererOrders(user: User) {
        try {
            const deliverer: Deliverer = await DelivererService.findWithUserId(user.id);

            if (!deliverer) {
                return createError('CannotFindDeliverer', 'Cannot find your deliverer account', 404);
            }

            const orders: Order[] = await OrderService.findWithDeliverer(deliverer);

            return {data: orders, code: 200};

        } catch (e) {
            return mongooseErrors(e);
        }
    }

    /**
     * Controller to get all orders for a client
     * @param user
     */
    static async getClientOrders(user: User) {
        try {
            const orders: Order[] = await OrderService.findWithClientId(user.id);

            return {data: orders, code: 200};

        } catch (e) {
            return mongooseErrors(e);
        }
    }
}

