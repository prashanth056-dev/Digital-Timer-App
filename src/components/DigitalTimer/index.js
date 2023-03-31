// Write your code here
import './index.css'

import {Component} from 'react'

class DigitalTimer extends Component {
  state = {isRunning: false, seconds: 25 * 60, minutes: 25}

  tick = () => {
    this.setState(prevState => ({
      seconds: prevState.seconds - 1,
    }))
  }

  onDecrement = () => {
    const {seconds, isRunning} = this.state
    if (seconds >= 60 && !isRunning) {
      this.setState(prevState => ({
        seconds: prevState.minutes * 60 - 60,
        minutes: prevState.minutes - 1,
      }))
    }
  }

  onIncrement = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.setState(prevState => ({
        seconds: prevState.minutes * 60 + 60,
        minutes: prevState.minutes + 1,
      }))
    }
  }

  onReset = () => {
    this.setState({seconds: 25 * 60, minutes: 25, isRunning: false})
    clearInterval(this.timerId)
  }

  startOrStop = () => {
    const {isRunning} = this.state
    if (isRunning) {
      clearInterval(this.timerId)
    } else {
      this.timerId = setInterval(this.tick, 1000)
    }
    this.setState(prevState => ({isRunning: !prevState.isRunning}))
  }

  render() {
    const {isRunning, seconds, minutes} = this.state
    if (seconds === 0) {
      clearInterval(this.timerId)
    }
    const secsToMins = Math.floor(seconds / 60)
    const stringMinutes = secsToMins > 9 ? secsToMins : `0${secsToMins}`
    const stringSeconds = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`
    const imageUrl = isRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const altText = isRunning ? 'pause icon' : 'play icon'
    return (
      <div className="mainBg">
        <h1>Digital Timer</h1>
        <div className="row">
          <div className="imgCont">
            <div className="circle">
              <h1>
                {stringMinutes}:{stringSeconds}
              </h1>
              <p>{isRunning ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="btnCont">
            <div className="row">
              <button
                type="button"
                className="btn row"
                onClick={this.startOrStop}
              >
                <img src={imageUrl} alt={altText} className="img" />
                <p>{isRunning ? 'Pause' : 'Start'}</p>
              </button>
              <button type="button" className="btn row" onClick={this.onReset}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="img"
                />
                <p>Reset</p>
              </button>
            </div>
            <p>Set Timer Limit</p>
            <div className="row">
              <button
                className="btn bold"
                type="button"
                onClick={this.onDecrement}
              >
                -
              </button>
              <p className="minutes">{minutes}</p>
              <button
                className="btn bold"
                type="button"
                onClick={this.onIncrement}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
