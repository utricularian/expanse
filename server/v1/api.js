import express from 'express';

import SystemObjectsController from "./controllers/systemObjectsController";

export default class Api {
  constructor() {

  }

  createRouter() {
    const router = express.Router();

    router.get('/systems/:system_id/system_objects', SystemObjectsController.getAllSystemObjectsForSystem.bind(SystemObjectsController));
    router.get('/system_objects/:id', SystemObjectsController.getSystemObject.bind(SystemObjectsController));

    return router;
  }

}
