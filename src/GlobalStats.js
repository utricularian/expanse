import React from "react";

export default class GlobalStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {numSystems: 0};
  }

  async componentDidMount() {
    if (!this.props.systemsStore) {
      console.trace();
      throw {error: "Wut"};
    }
    const systems = await this.props.systemsStore.findAll();
    this.setState({numSystems: systems.length});
  }

  render() {
    return <div>
      <h1>Global Stats</h1>
      <a onClick={this.props.closeCallback}>Close</a>
      <div>Number of Systems: {this.state.numSystems}</div>
    </div>
  }
}
