

export default class SystemObject {
  constructor(attributes) {
    this.id = attributes.id;
    this.createdAt = attributes.createdAt ? new Date(attributes.createdAt) : attributes.createdAt;

    this.type = attributes.type;
    this.name = attributes.name;
    this.systemId = attributes.systemId;
    this.distanceFromSystemCenter = attributes.distanceFromSystemCenter;
    this.radiansFromSystemGate = attributes.radiansFromSystemGate
  }
}
