import {Express} from "express";
import {authenticateTransaction} from "../../../middleware/authenticate";
import {bodyPick} from "../../../middleware/utils";
import {RestaurantController} from "../../controllers/restaurant.controller";

export class RestaurantEndpoints {

    /**
     * Endpoint to create a restaurant
     * @param app
     */
    static createRestaurant(app: Express) {

        app.post('/restaurants/createRestaurant', authenticateTransaction, async (req: any, res) => {

            const body = bodyPick(['name', 'desc', 'address', 'phone', 'siret', 'img', 'deliveryCharges', 'userId', 'restaurantCategoryId'], req.body);
            body.userId = req.userId;

            const response = await RestaurantController.createRestaurant(body, req.role);

            res.status(response.code).send(response.data);

        });
    }

    /**
     * Endpoint to get all restaurants opened
     * @param app
     */
    static getRestaurantsOpened(app: Express) {

        app.get('/restaurants/getRestaurantsOpened', authenticateTransaction, async (req: any, res) => {

            const response = await RestaurantController.getRestaurantsOpened();

            res.status(response.code).send(response.data);

        });
    }

    /**
     * Endpoint to get all restaurants
     * @param app
     */
    static getRestaurants(app: Express) {

        app.get('/restaurants/getRestaurants', authenticateTransaction, async (req: any, res) => {
            const response = await RestaurantController.getRestaurants();

            res.status(response.code).send(response.data);
        });
    }

    /**
     * Endpoint to get restaurant by id
     * @param app
     */
    static getRestaurant(app: Express) {

        app.get('/restaurants/getRestaurant/:restaurantId', authenticateTransaction, async (req: any, res) => {
            const restaurantId = req.params.restaurantId;
            const response = await RestaurantController.getRestaurant(restaurantId);

            res.status(response.code).send(response.data);
        });
    }

    /**
     * Endpoint to get user restaurant
     * @param app
     */
    static getMyRestaurant(app: Express) {

        app.get('/restaurants/getMyRestaurant', authenticateTransaction, async (req: any, res) => {
            const response = await RestaurantController.getMyRestaurant(req.userId);

            res.status(response.code).send(response.data);
        });
    }
}
