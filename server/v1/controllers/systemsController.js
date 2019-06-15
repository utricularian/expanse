import AbstractController from "./abstractController";

import systemRepository from "../../repositories/systemRepository";
import ApiPayload from "./apiPayload";

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

      const payload = new ApiPayload(data);

      response.status(200).send(payload.toJSON());
    }
  }
}

export default new SystemsController();
