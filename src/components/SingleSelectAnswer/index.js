import './index.css'

const SingleSelectAnswer = props => {
  const {answerDetails, checkAnswer, showNextQuestion, selectedOptions} = props
  const {id, text, isCorrect} = answerDetails

  const onchangeRadioButton = () => {
    checkAnswer(isCorrect, id)
  }

  return (
    <>
      <li className="radio-answer-container">
        <input
          type="radio"
          id={text}
          className="radio-button"
          name="answer"
          value={text}
          onChange={onchangeRadioButton}
        />
        <label htmlFor={text} className="label">
          {text}
        </label>
        {showNextQuestion && isCorrect === 'true' && (
          <img
            src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
            alt="correct checked circle"
            className="correct-icon-image"
          />
        )}
        {showNextQuestion &&
          selectedOptions === id &&
          isCorrect === 'false' && (
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png"
              alt="incorrect close circle"
              className="correct-icon-image"
            />
          )}
      </li>
    </>
  )
}

export default SingleSelectAnswer
