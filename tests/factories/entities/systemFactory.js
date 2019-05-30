import System from "../../../src/models/system";


let _instance;

class SystemFactory {
  constructor() {
    if (!_instance) {
      _instance = this;
    }

    return _instance;
  }

  createSystem() {
    const rand = Math.floor(Math.random() * 100000);
    return new System({
      name: `System ${rand}`,
      distanceFromGalacticCore: rand,
      radiansAroundGalacticCore: rand % 3
    });
  }
}

export default new SystemFactory();
