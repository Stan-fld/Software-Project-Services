import {Express} from "express";
import {authenticateTransaction} from "../../../middleware/authenticate";
import {bodyPick} from "../../../middleware/utils";
import {OrderController} from "../../controllers/order.controller";

export default class OrderEndpoints {

    /**
     * Endpoint to create a order
     * @param app
     */
    static createOrder(app: Express) {

        app.post('/orders/order', authenticateTransaction, async (req: any, res) => {

            const body = bodyPick(['deliverer', 'restaurantId', 'itemsId', 'status'], req.body);
            body.clientId = req.user.id;

            const response = await OrderController.createOrder(body, req.user.role);

            res.status(response.code).send(response.data);

        });
    }

    /**
     * Endpoint to close user order
     * @param app
     */
    static restaurantAcceptOrder(app: Express) {

        app.patch('/orders/restaurant/accept', authenticateTransaction, async (req: any, res) => {

            const orderId = bodyPick(['_id'], req.body);

            const response = await OrderController.restaurantAcceptOrder(req.user, orderId);

            res.status(response.code).send(response.data);

        });
    }

    /**
     * Endpoint to accept order for deliverer
     * @param app
     */
    static delivererAcceptOrder(app: Express) {

        app.patch('/orders/deliverer/accept', authenticateTransaction, async (req: any, res) => {

            const orderId = bodyPick(['_id'], req.body);

            const response = await OrderController.delivererAcceptOrder(req.user, orderId);

            res.status(response.code).send(response.data);

        });
    }

    /**
     * Endpoint to change status to delivered
     * @param app
     */
    static orderDelivered(app: Express) {

        app.patch('/orders/deliverer/delivered', authenticateTransaction, async (req: any, res) => {

            const orderId = bodyPick(['_id'], req.body);

            const response = await OrderController.orderDelivered(req.user, orderId);

            res.status(response.code).send(response.data);

        });
    }

    /**
     * Endpoint to get all orders for restaurant
     * @param app
     */
    static getRestaurantOrders(app: Express) {

        app.get('/orders/restaurant', authenticateTransaction, async (req: any, res) => {

            const response = await OrderController.getRestaurantOrders(req.user);

            res.status(response.code).send(response.data);

        });
    }

    /**
     * Endpoint to get all pending orders for restaurant
     * @param app
     */
    static getRestaurantPendingOrders(app: Express) {

        app.get('/orders/restaurant/pending', authenticateTransaction, async (req: any, res) => {

            const response = await OrderController.getRestaurantPendingOrders(req.user);

            res.status(response.code).send(response.data);

        });
    }

    /**
     * Endpoint to get all in progress orders for deliverer
     * @param app
     */
    static getDelivererInProgressOrders(app: Express) {

        app.get('/orders/deliverer/inProgress', authenticateTransaction, async (req: any, res) => {

            const response = await OrderController.getDelivererInProgressOrders(req.user);

            res.status(response.code).send(response.data);

        });
    }

    /**
     * Endpoint to get all orders for deliverer
     * @param app
     */
    static getDelivererOrders(app: Express) {

        app.get('/orders/deliverer', authenticateTransaction, async (req: any, res) => {

            const response = await OrderController.getDelivererOrders(req.user);

            res.status(response.code).send(response.data);

        });
    }

    /**
     * Endpoint to get all client orders
     * @param app
     */
    static getClientOrders(app: Express) {

        app.get('/orders/client', authenticateTransaction, async (req: any, res) => {

            const response = await OrderController.getClientOrders(req.user);

            res.status(response.code).send(response.data);

        });
    }
}
