let instance = null;

class CelestialBodiesController  {
  constructor() {
    if (!instance) {
      instance = this;
    }

    return instance;
  }

  preProcess(request, response) {
    console.log(`Preprocessing Content-Type: ${request.get('Content-Type')}`);
    if (request.get('Content-Type') !== 'application/vnd.api+json') {
      response.status(415).send('Content-Type must be "application/vnd.api+json"');
      return false;
    }
    return true;
  };

  getAllCelestialBodies(request, response) {
    if (this.preProcess(request, response)) {
      const dummyData = {
        data: [{
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
        }],
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

  getCelestialBody(request, response) {
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

export default new CelestialBodiesController();
