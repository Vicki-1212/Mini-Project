import Header from '../Header'
import ScoreContext from '../../context/ScoreContext'
import './index.css'

const GameReport = () => {
  const renderUnattemptedQuestionView = unattendedQuestionList => (
    <div className="game-unattempted-question-container">
      <p className="unattempted-question-heading">Unattempted Questions</p>
      <div>
        {unattendedQuestionList.map(eachQuestion => (
          <>
            <h1 className="unattempted-question-text">
              {eachQuestion.questionText}
            </h1>
            {eachQuestion.optionsType === 'DEFAULT' && (
              <ul className="answer-section">
                {eachQuestion.options.map(eachAnswer => (
                  <li className="answer-items">
                    <button
                      className={
                        eachAnswer.isCorrect === 'true'
                          ? 'answer-button hover'
                          : 'answer-button'
                      }
                    >
                      {eachAnswer.text}
                    </button>
                    {eachAnswer.isCorrect === 'true' && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                        alt="correct checked circle"
                        className="correct-icon-image"
                      />
                    )}
                  </li>
                ))}
              </ul>
            )}
            {eachQuestion.optionsType === 'IMAGE' && (
              <ul className="answer-section">
                {eachQuestion.options.map(eachAnswer => (
                  <li className="image-answer-items">
                    <button type="button" className="image-answer-button">
                      <img
                        src={eachAnswer.imageUrl}
                        alt={eachAnswer.text}
                        className="answer-image"
                      />
                    </button>
                    {eachAnswer.isCorrect === 'true' && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                        alt="correct checked circle"
                        className="correct-icon-image"
                      />
                    )}
                  </li>
                ))}
              </ul>
            )}
            {eachQuestion.optionsType === 'SINGLE_SELECT' && (
              <ul className="single-select-answer-section">
                {eachQuestion.options.map(eachAnswer => (
                  <li className="radio-answer-container">
                    <input
                      type="radio"
                      id={eachAnswer.text}
                      className="radio-button"
                      name="answer"
                      value={eachAnswer.text}
                    />
                    <label htmlFor={eachAnswer.text} className="label">
                      {eachAnswer.text}
                    </label>
                    {eachAnswer.isCorrect === 'true' && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                        alt="correct checked circle"
                        className="correct-icon-image"
                      />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </>
        ))}
      </div>
    </div>
  )

  const renderNoUnattemptedQuestion = () => (
    <div className="no-unAttemptedQuestionView-container">
      <h1 className="unAttempted-paragraph">Attempted all the questions</h1>
    </div>
  )

  return (
    <div className="game-report-app-container">
      <Header />
      <ScoreContext.Consumer>
        {value => {
          const {
            unattendedQuestionList,
            score,
            total,
            correctAnswers,
            inCorrectAnswers,
            unattendedQuestion,
          } = value

          return (
            <div className="game-report-container">
              <div className="game-report-result-container">
                <div className="game-report-result-mark-container">
                  <p className="your-mark">{score}</p>
                  <p className="divide-break">/</p>
                  <p className="total-mark">{total}</p>
                </div>
                <div className="game-report-correct-wrong-container">
                  <diV className="answer-check-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/quiz-game-right-check-img.png"
                      alt="correct answer icon"
                      className="answer-check-icon"
                    />
                    <p className="quiz-result">
                      {correctAnswers} Correct Answer
                    </p>
                  </diV>
                  <div className="answer-check-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/quiz-game-wrong-check-img.png"
                      alt="incorrect answer icon"
                      className="answer-check-icon"
                    />
                    <p className="quiz-result">
                      {inCorrectAnswers} Wrong Answer
                    </p>
                  </div>
                  <div className="answer-check-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/quiz-game-un-answered-img.png"
                      alt="unattempted icon"
                      className="answer-check-icon"
                    />
                    <p className="quiz-result">
                      {unattendedQuestion} Unattempted
                    </p>
                  </div>
                </div>
              </div>
              {unattendedQuestionList.length > 0
                ? renderUnattemptedQuestionView(unattendedQuestionList)
                : renderNoUnattemptedQuestion()}
            </div>
          )
        }}
      </ScoreContext.Consumer>
    </div>
  )
}

export default GameReport
