import Restaurant, {IRestaurant} from "../../db/restaurant.model";
import {RestaurantService} from "../services/restaurant.service";
import {createError, mongooseErrors} from "../errors/errors";
import {Role} from "../../models/role.model";
import {roles} from "../../config/enums";
import {RestaurantCategoryService} from "../services/restaurant-category.service";
import RestaurantCategory from "../../db/restaurant-category";

export class RestaurantController {

    /**
     * Controller to create a restaurant
     * @param body
     * @param role
     */
    static async createRestaurant(body: IRestaurant, role: Role) {
        try {
            let restaurant = await RestaurantService.findWithUserId(body.userId);

            if (restaurant) {
                return createError('RestaurantAlreadyExists', 'Restaurant already exists for this user', 400);
            }

            const restaurantCategory: RestaurantCategory = await RestaurantCategoryService.findWithId(body.restaurantCategoryId);

            if (!restaurantCategory) {
                return createError('CannotFoundRestaurantCategory', 'Cannot found restaurant category for given id', 404);
            }

            if (role.name !== roles.client) {
                return createError('InvalidRole', 'Invalid role', 400);
            }

            body.restaurantCategory = restaurantCategory;
            restaurant = await RestaurantService.saveRestaurant(new Restaurant(body));

            return {data: restaurant, code: 200};

        } catch (e) {
            return mongooseErrors(e);
        }

    }
}
