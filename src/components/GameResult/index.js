import Header from '../Header'
import ScoreContext from '../../context/ScoreContext'
import './index.css'

const GameResult = props => {
  const onClickReportButton = () => {
    const {history} = props
    history.replace('/game-report')
  }

  const renderQuizPassView = (score, total, percentage) => (
    <div className="quiz-result-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/quiz-game-congrats-trophy-img.png"
        alt="won"
        className="won-image"
      />
      <h1 className="congrats-text">Congrats</h1>
      <h1 className="win-percentage-text">{percentage}% Correctly Answered.</h1>
      <p className="quiz-complete-text">Quiz completed successfully.</p>
      <p className="quiz-attempt-report">
        You attempted {score} out of {total} questions as correct
      </p>
      <button
        type="button"
        className="report-button"
        onClick={onClickReportButton}
      >
        Report
      </button>
    </div>
  )

  const renderQuizFailView = (score, total, percentage) => (
    <div className="quiz-fail-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/quiz-game-lose-img.png"
        alt="lose"
        className="fail-image"
      />
      <h1 className="congrats-text">You lose!</h1>
      <h1 className="win-percentage-text">{percentage}% Correctly Answered</h1>
      <p className="quiz-attempt-report">
        You attempted {score} out of {total} questions as correct
      </p>
      <button
        type="button"
        className="report-button"
        onClick={onClickReportButton}
      >
        Report
      </button>
    </div>
  )

  return (
    <div className="quiz-result-app-container">
      <Header />
      <ScoreContext.Consumer>
        {value => {
          const {score, total, percentage} = value

          return (
            <>
              {percentage >= 60
                ? renderQuizPassView(score, total, percentage)
                : renderQuizFailView(score, total, percentage)}
            </>
          )
        }}
      </ScoreContext.Consumer>
    </div>
  )
}

export default GameResult
