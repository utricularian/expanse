import PGPromise from 'pg-promise';

let instance = null;

class CelestialBodiesController  {
  constructor() {
    if (!instance) {
      instance = this;
    }

    return instance;
  }

  preProcess(request, response) {
    if (request.get('Content-Type') !== 'application/vnd.api+json') {
      response.status(415).send('Content-Type must be "application/vnd.api+json"');
      return false;
    }
    return true;
  };

  getAllCelestialBodies(request, response) {
    if (this.preProcess(request, response)) {

      var pgp = PGPromise();
      var db = pgp('postgres://expanse_user:4hduBa97@localhost:54320/expanse_db');

      db.any('SELECT id, name from celestial_bodies')
        .then(function (data) {
          console.log('DATA:', data.value);

          const dataObjects = data.map((datum) => {
            return {
              type: "celestial_bodies",
              id: datum['id'],
              attributes: {
                name: datum['name']
              }
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

        })
        .catch(function (error) {
          console.log('ERROR:', error)
        });
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
