import System from "../../../src/models/system";


let _instance;

class SystemFactory {
  constructor() {
    if (!_instance) {
      _instance = this;
    }

    return _instance;
  }

  createSystem(props) {
    const rand = Math.floor(Math.random() * 100000);
    props = props || {};
    return new System({
      id: props.id ? props.id : undefined,
      name: `System ${rand}`,
      distanceFromGalacticCore: rand,
      radiansAroundGalacticCore: rand % 3,
      createdAt: props.createdAt ? props.createdAt : undefined
    });
  }
}

export default new SystemFactory();
