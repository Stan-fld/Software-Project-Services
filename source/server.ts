import './config/config.js';
import express, {Express} from "express";
import methodOverride from "method-override";
import {cors} from "./middleware/cors"
import './db/setup/db-mongoose-setup';
import RestaurantEndpoints from "./server/enpoints/restaurant/restaurant-endpoints";
import ItemEndpoints from "./server/enpoints/item/item-endpoints";


const app: Express = express();

app.use(cors);
app.use(express.json({limit: '2mb'}));
app.use(methodOverride('X-HTTP-Method-Override'));

RestaurantEndpoints.createRestaurant(app);
RestaurantEndpoints.updateRestaurant(app);
RestaurantEndpoints.closeMyRestaurant(app);
RestaurantEndpoints.openRestaurant(app);
RestaurantEndpoints.getRestaurantsOpened(app);
RestaurantEndpoints.getRestaurants(app);
RestaurantEndpoints.getRestaurant(app);
RestaurantEndpoints.getMyRestaurant(app);
RestaurantEndpoints.getRestaurantCategories(app);

ItemEndpoints.createItem(app);
ItemEndpoints.updateItem(app);
ItemEndpoints.deleteItem(app);
ItemEndpoints.getMyItems(app);
ItemEndpoints.getRestaurantItems(app);
ItemEndpoints.getItem(app);

// Handling Errors and 404
app.use(function (req, res) {
    const error = [{
        name: 'NoExistingRoute',
        message: 'Route ' + req.originalUrl + ' with: ' + req.method + ' does not exist.',
        code: 404
    }];
    res.status(404).send({error});
});

const PORT: any = process.env.port ?? 3000;
app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));

export = app;
