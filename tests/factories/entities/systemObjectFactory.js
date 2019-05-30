import SystemObject from "../../../src/models/systemObject";

let _instance;

class SystemObjectFactory {
  constructor() {
    if (!_instance) {
      _instance = this;
    }

    return _instance;
  }

  createSystemObject(options) {
    const rand = Math.floor(Math.random() * 100000);
    return new SystemObject({
      name: options.name || `SystemObject ${rand}`,
      type: 'rocky planet',
      systemId: options.system.id,
      distanceFromSystemCenter: rand,
      radiansFromSystemGate: rand % 3
    });
  }
}

export default new SystemObjectFactory();
