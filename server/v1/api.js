import express from 'express';

import CelestialBodiesController from "./controllers/celestial_bodies_controller";

export default class Api {
  constructor() {

  }

  createRouter() {
    const router = express.Router();

    router.get('/celestial_bodies', CelestialBodiesController.getAllCelestialBodies.bind(CelestialBodiesController));
    router.get('/celestial_bodies/:id', CelestialBodiesController.getCelestialBody.bind(CelestialBodiesController));

    return router;
  }

}
