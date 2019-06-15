import AbstractController from './abstractController';
import systemObjectRepository from "../../repositories/systemObjectRepository";
import ApiPayload from "./apiPayload";

let instance = null;

class SystemsObjectsController extends AbstractController {
  constructor() {
    if (!instance) {
      instance = super();
    }

    return instance;
  }

  async getAllSystemObjectsForSystem(request, response) {
    if (this.preProcess(request, response)) {

      const systemObjects = await systemObjectRepository.findAllBySystemId(request.params.system_id);
      const dataObjects = systemObjects.map((datum) => {
        return {
          type: "system_objects",
          id: datum.id,
          attributes: datum
        }
      });

      const payload = new ApiPayload(dataObjects);
      response
        .status(200)
        .send(payload.toJSON());
    }
  }
}

export default new SystemsObjectsController();
