import Restaurant, {IRestaurant} from "../../db/restaurant.model";
import {RestaurantService} from "../services/restaurant.service";
import {createError, mongooseErrors} from "../errors/errors";
import {Role} from "../../models/role.model";
import {restauStatus, roles} from "../../config/enums";
import {RestaurantCategoryService} from "../services/restaurant-category.service";
import RestaurantCategory from "../../db/restaurant-category";
import mongoose from "mongoose";


export class RestaurantController {

    /**
     * Controller to create a restaurant
     * @param body
     * @param role
     */
    static async createRestaurant(body: IRestaurant, role: Role) {
        try {
            let restaurant: Restaurant = await RestaurantService.findWithUserId(body.user.id);

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

    /**
     * Controller to open a restaurant
     * @param body
     */
    static async openRestaurant(body: { userId: string }) {
        try {
            const restaurant: Restaurant = await RestaurantService.findWithUserId(body.userId);

            if (!restaurant) {
                return createError('CannotFoundRestaurant', 'Cannot found your restaurant', 404);
            }

            restaurant.status = restauStatus.opened;

            await RestaurantService.saveRestaurant(restaurant);

            return {data: {success: true}, code: 200};
        } catch (e) {
            return mongooseErrors(e);
        }
    }

    /**
     * Controller to get all restaurants opened
     */
    static async getRestaurantsOpened() {
        try {
            const restaurants: Restaurant[] = await RestaurantService.findWithStatus();

            return {data: restaurants, code: 200};

        } catch (e) {
            return mongooseErrors(e);
        }
    }

    /**
     * Controller to get all restaurants
     */
    static async getRestaurants() {
        try {
            const restaurants: Restaurant[] = await RestaurantService.findAll();

            return {data: restaurants, code: 200};

        } catch (e) {
            return mongooseErrors(e);
        }
    }

    /**
     * Controller to get a restaurant for a given id
     * @param restaurantId
     */
    static async getRestaurant(restaurantId?: string) {
        try {
            if (!restaurantId || !mongoose.isValidObjectId(restaurantId)) {
                return createError('InvalidRestaurantId', 'Invalid restaurant id', 400);
            }

            const restaurant: Restaurant = await RestaurantService.findWithId(restaurantId);

            if (!restaurant) {
                return createError('CannotFoundRestaurant', 'Cannot found restaurant for given id', 404);
            }

            return {data: restaurant, code: 200};

        } catch (e) {
            return mongooseErrors(e);
        }
    }

    /**
     * Controller to get user restaurant
     * @param userId
     */
    static async getMyRestaurant(userId: string) {
        try {
            const restaurant: Restaurant = await RestaurantService.findWithUserId(userId);

            if (!restaurant) {
                return createError('CannotFoundRestaurant', 'Cannot found your restaurant', 404);
            }

            return {data: restaurant, code: 200};

        } catch (e) {
            return mongooseErrors(e);
        }
    }

    static async getRestaurantCategories() {
        try {
            const restaurantCategories: RestaurantCategory[] = await RestaurantCategoryService.findAll();

            return {data: restaurantCategories, code: 200};

        } catch (e) {
            return mongooseErrors(e);
        }

    }
}
