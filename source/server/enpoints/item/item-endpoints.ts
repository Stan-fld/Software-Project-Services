import {Express} from "express";
import {authenticateTransaction} from "../../../middleware/authenticate";
import {bodyPick} from "../../../middleware/utils";
import {ItemController} from "../../controllers/item.controller";

export default class ItemEndpoints {

    /**
     * Endpoint to create an item
     * @param app
     */
    static createItem(app: Express) {

        app.post('/restaurants/item', authenticateTransaction, async (req: any, res) => {

            const body = bodyPick(['name', 'desc', 'price', 'img', 'restaurant'], req.body);

            const response = await ItemController.createItem(body, req.user);

            res.status(response.code).send(response.data);

        });
    }

    /**
     * Endpoint to update an item
     * @param app
     */
    static updateItem(app: Express) {

        app.patch('/restaurants/item', authenticateTransaction, async (req: any, res) => {

            const body = bodyPick(['name', 'desc', 'price', 'img', 'restaurant'], req.body);
            const itemId = bodyPick(['_id'], req.body);

            const response = await ItemController.updateItem(itemId, body, req.user);

            res.status(response.code).send(response.data);

        });
    }

    /**
     * Endpoint to delete an item
     * @param app
     */
    static deleteItem(app: Express) {

        app.delete('/restaurants/item/:itemId', authenticateTransaction, async (req: any, res) => {

            const response = await ItemController.deleteItem(req.params.itemId, req.user);

            res.status(response.code).send(response.data);

        });
    }

    /**
     * Endpoint to get user restaurant items
     * @param app
     */
    static getMyItems(app: Express) {

        app.get('/restaurants/myItems', authenticateTransaction, async (req: any, res) => {

            const response = await ItemController.getMyItems(req.user);

            res.status(response.code).send(response.data);

        });
    }

    /**
     * Endpoint to get specific restaurant items
     * @param app
     */
    static getRestaurantItems(app: Express) {

        app.get('/restaurants/items/:restaurantId', authenticateTransaction, async (req: any, res) => {

            const response = await ItemController.getRestaurantItems(req.params.restaurantId);

            res.status(response.code).send(response.data);

        });
    }

    /**
     * Endpoint to get specific item
     * @param app
     */
    static getItem(app: Express) {

            app.get('/restaurants/item/:itemId', authenticateTransaction, async (req: any, res) => {

                const response = await ItemController.getItem(req.params.itemId, req.user);

                res.status(response.code).send(response.data);

            });
    }
}
