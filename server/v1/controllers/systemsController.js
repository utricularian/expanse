import AbstractController from "./abstractController";

import systemRepository from "../../repositories/systemRepository";

let instance = null;

class SystemsController extends AbstractController {
  constructor() {
    if (!instance) {
      instance = super();
    }

    return instance;
  }

  async getAllSystems(request, response) {
    if (this.preProcess(request, response)) {
      const systemObjects = await systemRepository.findAll();
      const data = systemObjects.map((datum) => {
        return {
          type: "system",
          id: datum.id,
          attributes: datum
        }
      });

      const payload = {
        data: data,
        meta: {},
        links: [],
        jsonapi: {},
        included: []
      };

      response.status(200).send(JSON.stringify(payload));
    }
  }
}

export default new SystemsController();
