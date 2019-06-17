import System from "../models/system";

export default class SystemsStore {
  constructor(props) {
    this.request = props.apiRequest;
  }

  async findAll() {
    try {
      const fromServer = await this.request.makeRequest('/api/v1/systems');
      const systems = [];
      fromServer.data.forEach((datum) =>  {
        systems.push(new System(datum.attributes));
      });
      return systems;
    } catch (e) {
      // TODO inject a logger
      // console.error('Error in SystemsStore#findAll', e);
    }

    return [];
  }
};
