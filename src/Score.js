import React from 'react';

export default class Score extends React.Component {

  render() {
    return (<div className="score-box">
      Score
      <div className="score">{this.props.score}</div>
    </div>)
  }
}