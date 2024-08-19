import './index.css'

const QuizAnswer = props => {
  const {answerDetails, checkAnswer, showNextQuestion, selectedOptions} = props
  const {id, text, isCorrect} = answerDetails

  const onCheckCorrectAnswer = () => {
    checkAnswer(isCorrect, id)
  }

  return (
    <>
      <li className="answer-items">
        <button
          className={`answer-button ${
            showNextQuestion
              ? answerDetails.isCorrect === 'true'
                ? 'correct'
                : selectedOptions === id
                ? 'wrong'
                : ''
              : ''
          }`}
          onClick={onCheckCorrectAnswer}
        >
          {text}
        </button>
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

export default QuizAnswer
