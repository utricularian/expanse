import express from 'express';

import SystemsController from "./controllers/systemsController";
import SystemObjectsController from "./controllers/systemObjectsController";

export default class Api {
  constructor() {

  }

  createRouter() {
    const router = express.Router();

    router.get('/systems', SystemsController.getAllSystems.bind(SystemsController));

    router.get('/systems/:system_id/system_objects', SystemObjectsController.getAllSystemObjectsForSystem.bind(SystemObjectsController));

    return router;
  }

}
