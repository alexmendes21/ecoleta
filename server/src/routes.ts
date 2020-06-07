import express from 'express';
import knex from  './Database/connection';
import multer from 'multer';
import pointsController from './Controllers/pointsController'
import itemsController from './Controllers/itemsController'
import multerConfig from './config/multer';
import { celebrate, Joi }from 'celebrate';

//index(padrao para listagens), show(registo unico), create, update, delete
const routes = express.Router();
const PointsController = new pointsController();
const ItemsController = new itemsController();
const upload = multer(multerConfig);

routes.get('/items', ItemsController.index);  

routes.get('/points', PointsController.index);  
routes.get('/points/:id', PointsController.show);


routes.post(
    '/points',
    upload.single('image'),  
    celebrate ({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        })
    }, {
        abortEarly: false
    }),
    PointsController.create);


export default routes;