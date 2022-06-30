import {Express} from "express";
import {authenticateTransaction} from "../../../middleware/authenticate";
import {bodyPick} from "../../../middleware/utils";
import {DelivererController} from "../../controllers/deliverer.controller";

export default class DelivererEndpoints {

    /**
     * Endpoint to create a restaurant
     * @param app
     */
    static createDelivererAccount(app: Express) {

        app.post('/deliverers/deliverer', authenticateTransaction, async (req: any, res) => {

            const response = await DelivererController.createDelivererAccount(req.user);

            res.status(response.code).send(response.data);

        });
    }

    /**
     * Endpoint to close user deliverer
     * @param app
     */
    static revokeMyDelivererAccount(app: Express) {

        app.patch('/deliverers/deliverer/revoke', authenticateTransaction, async (req: any, res) => {

            const response = await DelivererController.revokeMyDelivererAccount(req.user.id);

            res.status(response.code).send(response.data);

        });
    }

    /**
     * Endpoint to open deliverer
     * @param app
     */
    static allowDeliverer(app: Express) {

        app.patch('/deliverers/deliverer/allow', authenticateTransaction, async (req: any, res) => {
            const body = bodyPick(['userId'], req.body);

            const response = await DelivererController.openRestaurant(body);

            res.status(response.code).send(response.data);

        });
    }

    /**
     * Endpoint to get all deliverers
     * @param app
     */
    static getDeliverers(app: Express) {

        app.get('/deliverers', authenticateTransaction, async (req: any, res) => {
            const response = await DelivererController.getDeliverers();

            res.status(response.code).send(response.data);
        });
    }

    /**
     * Endpoint to get deliverer by id
     * @param app
     */
    static getDeliverer(app: Express) {

        app.get('/deliverers/deliverer/:delivererId', authenticateTransaction, async (req: any, res) => {
            const delivererId = req.params.delivererId;
            const response = await DelivererController.getDeliverer(delivererId);

            res.status(response.code).send(response.data);
        });
    }
}
