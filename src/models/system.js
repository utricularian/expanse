
export default class System {
  constructor(attributes) {
    this.id = attributes.id;
    this.createdAt = attributes.createdAt ? new Date(attributes.createdAt) : attributes.createdAt;

    this.name = attributes.name;
    this.distanceFromGalacticCore = attributes.distanceFromGalacticCore;
    this.radiansAroundGalacticCore = attributes.radiansAroundGalacticCore;
  }
}
