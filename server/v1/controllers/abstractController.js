
export default class AbstractController {
  constructor() {

  }

  preProcess(request, response) {
    if (request.get('Content-Type') !== 'application/json') {
      response.status(415).send('Content-Type must be "application/json"');
      return false;
    }
    response.set('Content-Type', 'application/json');
    return true;
  };


}
