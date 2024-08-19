import './index.css'

const ImageAnswer = props => {
  const {answerDetails, checkAnswer, showNextQuestion, selectedOptions} = props
  const {id, text, imageUrl, isCorrect} = answerDetails

  const onClickImageButton = () => {
    checkAnswer(isCorrect, id)
  }

  return (
    <>
      <li className="image-answer-items">
        <button
          type="button"
          className="image-answer-button"
          onClick={onClickImageButton}
        >
          <img src={imageUrl} alt={text} className="answer-image" />
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

export default ImageAnswer
