import React from "react";

export default class GlobalStats extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return <div>
      <h1>Global Stats</h1>
      <a onClick={this.props.closeCallback}>Close</a>
    </div>
  }
}
