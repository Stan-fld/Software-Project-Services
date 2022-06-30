import Item, {IItem} from "../../db/item.model";
import {User} from "../../models/user.model";
import {RestaurantService} from "../services/restaurant.service";
import {createError, mongooseErrors} from "../errors/errors";
import {ItemService} from "../services/item.service";
import Restaurant from "../../db/restaurant.model";

export class ItemController {

    /**
     * Controller to create an item.
     * @param body
     * @param user
     */
    static async createItem(body: IItem, user: User) {
        try {
            const restaurant: Restaurant = await RestaurantService.findWithUserId(user.id);

            if (!restaurant) {
                return createError('CannotFindRestaurant', 'Cannot find your restaurant', 404);
            }

            body.restaurant = restaurant;
            let item: Item = new Item(body);

            item = await ItemService.saveItem(item);

            return {data: item, code: 200};
        } catch (e) {
            return mongooseErrors(e);
        }
    }

    /**
     * Controller to update an item.
     * @param itemId
     * @param body
     * @param user
     */
    static async updateItem(itemId: string, body: IItem, user: User) {
        try {
            const restaurant: Restaurant = await RestaurantService.findWithUserId(user.id);

            if (!restaurant) {
                return createError('CannotFindRestaurant', 'Cannot find your restaurant', 404);
            }

            let item: Item = await ItemService.findWithIdAndRestaurant(itemId, restaurant);

            if (!item) {
                return createError('CannotFindItem', 'Cannot find your item', 404);
            }

            item.name = body.name || item.name;
            item.desc = body.desc || item.desc;
            item.price = body.price || item.price;
            item.img = body.img || item.img;

            item = await ItemService.saveItem(item);

            return {data: item, code: 200};
        } catch (e) {
            return mongooseErrors(e);
        }
    }

    /**
     * Controller to delete an item.
     * @param itemId
     * @param user
     */
    static async deleteItem(itemId: string, user: User) {
        try {
            const restaurant: Restaurant = await RestaurantService.findWithUserId(user.id);

            if (!restaurant) {
                return createError('CannotFindRestaurant', 'Cannot find your restaurant', 404);
            }

            let item: Item = await ItemService.findWithIdAndRestaurant(itemId, restaurant);

            if (!item) {
                return createError('CannotFindItem', 'Cannot find your item', 404);
            }

            await ItemService.deleteItem(itemId, restaurant);

            return {data: {success: true}, code: 200};
        } catch (e) {
            return mongooseErrors(e);
        }
    }

    /**
     * Controller to get all items for user restaurant.
     * @param user
     */
    static async getMyItems(user: User) {
        try {
            const restaurant: Restaurant = await RestaurantService.findWithUserId(user.id);

            if (!restaurant) {
                return createError('CannotFindRestaurant', 'Cannot find your restaurant', 404);
            }

            const items: Item[] = await ItemService.findWithRestaurant(restaurant);

            return {data: items, code: 200};
        } catch (e) {
            return mongooseErrors(e);
        }
    }

    /**
     * Controller to get all items for specific restaurant.
     * @param restaurantId
     */
    static async getRestaurantItems(restaurantId: string) {
        try {
            const restaurant: Restaurant = await RestaurantService.findWithId(restaurantId);

            if (!restaurant) {
                return createError('CannotFindRestaurant', 'Cannot find your restaurant', 404);
            }

            const items: Item[] = await ItemService.findWithRestaurant(restaurant);

            return {data: items, code: 200};
        } catch (e) {
            return mongooseErrors(e);
        }
    }

    static async getItem(itemId: string, user: User) {
        try {
            const restaurant: Restaurant = await RestaurantService.findWithUserId(user.id);

            if (!restaurant) {
                return createError('CannotFindRestaurant', 'Cannot find your restaurant', 404);
            }

            const item: Item = await ItemService.findWithIdAndRestaurant(itemId, restaurant);

            if (!item) {
                return createError('CannotFindItem', 'Cannot find your item', 404);
            }

            return {data: item, code: 200};
        } catch (e) {
            return mongooseErrors(e);
        }
    }
}
