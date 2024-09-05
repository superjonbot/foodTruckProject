const express = require('express');

const headerMiddleware = require('./middleware/xheader');
const errorHandler = require('./middleware/errorHandler');
const validate = require('./middleware/validate');

const homeController = require('./controllers/home');
const foodTruckController = require('./controllers/locate');

const schema = require('./models/foodTruckSchema');
const router = express.Router();

router.use(headerMiddleware);
router.get('/', homeController.index);

// ROUTES
router.get('/api/locate/foodtruck', validate(schema), foodTruckController.foodTruck);

router.get('*', homeController.notFound);

router.use(errorHandler);

module.exports = router;
