import React from 'react';
import GlobalStats from "./GlobalStats/GlobalStats";
import Input from "./Widgets/Input/Input";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isGlobalStatsOpen : true, username: "" };
  }

  renderGlobalStats() {
    if (this.state.isGlobalStatsOpen) {
      return <GlobalStats systemsStore={this.props.systemsStore} systemObjectsStore={this.props.systemObjectsStore} closeCallback={this.handleCloseGlobalStats} />;
    }
    else {
      return (
        <Input label={"Username:"} value={this.state.username} changeCallback={this.handleUsernameChange} submitCallback={this.handleFormSubmit} />
      );
    }
  }

  handleFormSubmit = () => {
    this.props.loginCallback(this.state.username);
  };

  handleUsernameChange = (username) => {
    this.setState({username: username});
  };

  handleCloseGlobalStats = () => {
    this.setState({ isGlobalStatsOpen: false });
  };

  render() {
    return <div>
      <h1>Expanse</h1>
      {this.renderGlobalStats()}
    </div>;
  }
};

