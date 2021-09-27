import React from "react";

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: 5 };
    this.timer = setInterval(() => this.tick(), 1000);
  }

  tick() {
    const current = this.state.time;
    if (current > 0) {
      this.setState({ time: current - 1 });
    } else {
      // clearInterval(this.timer);
      this.setState({ time: 5 });
      this.props.timeOut();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.timerReset !== prevProps.timerReset) {
      this.setState({ time: 5 });
    }
  }

  render() {
    const { time } = this.state;
    return (
      <div className="timer-box">
        Time
        <div className="timer">{time}</div>
      </div>
    );
  }
}
