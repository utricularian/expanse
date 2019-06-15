import AbstractController from './abstractController';
import systemObjectRepository from "../../repositories/systemObjectRepository";

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

      const dummyData = {
        data: dataObjects,
        // errors: [],
        meta: {},
        links: [],
        jsonapi: {},
        included: []
      };
      response
        .status(200)
        .send(JSON.stringify(dummyData));
    }
  }

  getSystemObject(request, response) {
    if (this.preProcess(request, response)) {
      const dummyData = {
        data: {
          type: "celestial_bodies",
          id: request.params['id'],
          attributes: {
            name: "Test Planet",
            baz: [1, 2, 3]
          },
          relationships: {
            system: {
              links: {
                self: `/api/celestial_bodies/${request.params['id']}/system`
              },
              data: {
                type: "systems",
                id: "77"
              }
            }
          },
          links: [],
          meta: {}
        },
        // errors: [],
        meta: {},
        links: [],
        jsonapi: {},
        included: []
      };
      response
        .status(200)
        .send(JSON.stringify(dummyData));
    }

  }
}

export default new SystemsObjectsController();
