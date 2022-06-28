import {Express} from "express";
import {authenticateTransaction} from "../../../middleware/authenticate";
import {bodyPick} from "../../../middleware/utils";
import {RestaurantController} from "../../controllers/restaurant.controller";

export class RestaurantEndpoints {

    /**
     * Endpoint for create a restaurant
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

}
