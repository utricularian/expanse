import systemRepository from "../../repositories/systemRepository";

let instance = null;

class SystemsController {
  constructor() {
    if (!instance) {
      instance = this;
    }

    return instance;
  }

  preProcess(request, response) {
    if (request.get('Content-Type') !== 'application/json') {
      response.status(415).send('Content-Type must be "application/json"');
      return false;
    }
    response.set('Content-Type', 'application/json');
    return true;
  };

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

export default new SystemsController;
