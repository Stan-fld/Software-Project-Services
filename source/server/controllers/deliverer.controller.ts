import Deliverer from "../../db/deliverer.model";
import {DelivererService} from "../services/deliverer.service";
import {createError, mongooseErrors} from "../errors/errors";
import {delivererStatus, roles} from "../../config/enums";
import mongoose from "mongoose";
import {User} from "../../models/user.model";


export class DelivererController {

    /**
     * Controller to create a deliverer
     * @param user
     */
    static async createDelivererAccount(user: User) {
        try {
            let deliverer: Deliverer = await DelivererService.findWithUserId(user.id);

            if (deliverer) {
                return createError('DelivererAlreadyExists', 'Deliverer account already exists for this user', 400);
            }


            if (user.role.name !== roles.client) {
                return createError('InvalidRole', 'Invalid role', 400);
            }

            deliverer = await DelivererService.saveDeliverer(new Deliverer({
                userId: user.id,
                status: delivererStatus.pending
            }));

            return {data: deliverer, code: 200};

        } catch (e) {
            return mongooseErrors(e);
        }
    }

    /**
     * Controller to close a user deliverer
     * @param userId
     */
    static async revokeMyDelivererAccount(userId: string) {
        try {
            let deliverer: Deliverer = await DelivererService.findWithUserId(userId);

            if (!deliverer) {
                return createError('CannotFoundDeliverer', 'Cannot found your deliverer account', 404);
            }

            deliverer.status = delivererStatus.revoked;

            await DelivererService.saveDeliverer(deliverer);

            return {data: {success: true}, code: 200};
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
            const deliverer: Deliverer = await DelivererService.findWithUserId(body.userId);

            if (!deliverer) {
                return createError('CannotFoundDeliverer', 'Cannot found deliverer account', 404);
            }

            deliverer.status = delivererStatus.allowed;

            await DelivererService.saveDeliverer(deliverer);

            return {data: {success: true}, code: 200};
        } catch (e) {
            return mongooseErrors(e);
        }
    }

    /**
     * Controller to get all deliverers
     */
    static async getDeliverers() {
        try {
            const deliverers: Deliverer[] = await DelivererService.findAll();

            return {data: deliverers, code: 200};

        } catch (e) {
            return mongooseErrors(e);
        }
    }

    /**
     * Controller to get a restaurant for a given id
     * @param delivererId
     */
    static async getDeliverer(delivererId?: string) {
        try {
            if (!delivererId || !mongoose.isValidObjectId(delivererId)) {
                return createError('InvalidRestaurantId', 'Invalid restaurant id', 400);
            }

            const deliverer: Deliverer = await DelivererService.findWithId(delivererId);

            if (!deliverer) {
                return createError('CannotFoundDeliverer', 'Cannot found deliverer for given id', 404);
            }

            return {data: deliverer, code: 200};

        } catch (e) {
            return mongooseErrors(e);
        }
    }
}
