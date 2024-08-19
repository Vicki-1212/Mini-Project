import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import QuizAnswer from '../QuizAnswer'
import ImageAnswer from '../ImageAnswer'
import SingleSelectAnswer from '../SingleSelectAnswer'
import ScoreContext from '../../context/ScoreContext'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

const QuizGame = props => {
  let timer

  const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial)

  const [data, setData] = useState([])

  const [currentQuestion, setCurrentQuestion] = useState(0)

  const [timeLeft, setTimeLeft] = useState(15)

  const [showNextQuestion, setShowNextQuestion] = useState(false)

  const [selectedOptions, setSelectedOptions] = useState(null)

  useEffect(() => {
    const getQuestionData = async () => {
      const jwtToken = Cookies.get('jwt_token')
      const url = 'https://apis.ccbp.in/assess/questions'
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      setApiStatus(apiStatusConstant.inProgress)
      const response = await fetch(url, options)
      if (response.ok) {
        const newData = await response.json()
        const updatedData = newData.questions.map(eachList => ({
          id: eachList.id,
          questionText: eachList.question_text,
          optionsType: eachList.options_type,
          options: eachList.options.map(eachOptions => ({
            id: eachOptions.id,
            text: eachOptions.text,
            isCorrect: eachOptions.is_correct,
            imageUrl: eachOptions.image_url,
          })),
        }))
        setData(updatedData)
        setApiStatus(apiStatusConstant.success)
      } else {
        setApiStatus(apiStatusConstant.failure)
      }
    }
    getQuestionData()
  }, [])

  useEffect(() => {
    timer = setInterval(() => {
      setTimeLeft(prevState => prevState - 1)
    }, 1000)

    if (timeLeft === 0) {
      const nextQuestion = currentQuestion + 1
      if (nextQuestion < data.length) {
        setCurrentQuestion(nextQuestion)
        setShowNextQuestion(false)
        setTimeLeft(15)
      } else {
        clearInterval(timer)
        const {history} = props
        history.replace('/game-results')
      }
    }
    return () => clearInterval(timer)
  }, [timeLeft])

  const onClickNextQuestion = () => {
    if (selectedOptions !== null) {
      const nextQuestion = currentQuestion + 1
      if (nextQuestion < data.length) {
        setCurrentQuestion(nextQuestion)
        setShowNextQuestion(false)
        setTimeLeft(15)
        setSelectedOptions(null)
      } else {
        clearInterval(timer)
        setSelectedOptions(null)
        const {history} = props
        history.replace('/game-results')
      }
    }
  }

  const onClickRetryButton = () => {
    const {history} = props
    history.replace('/quiz-game')
  }

  const renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-assess-failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-view-heading">Something went wrong</h1>
      <p className="failure-view-paragraph">
        Our servers are busy please try again
      </p>
      <button
        type="button"
        className="failure-view-button"
        onClick={onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  const renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#263868" height={50} width={50} />
    </div>
  )

  const renderSuccessView = () => (
    <ScoreContext.Consumer>
      {value => {
        const {
          updateScore,
          score,
          updateTotal,
          updateUnattendedQuestionList,
          percentage,
          updatePercentage,
          correctAnswers,
          updateCorrectAnswer,
          inCorrectAnswers,
          updateInCorrectAnswer,
          unattendedQuestion,
          updateUnattendedQuestion,
        } = value

        if (timeLeft === 0) {
          if (selectedOptions === null) {
            updateUnattendedQuestionList(data[currentQuestion])
            updateUnattendedQuestion(unattendedQuestion)
          }
        }

        const checkAnswer = (isCorrect, id) => {
          clearInterval(timer)
          if (selectedOptions === null) {
            if (isCorrect === 'true') {
              updateScore(score)
              setShowNextQuestion(true)
              updateTotal(data.length)
              setSelectedOptions(id)
              updatePercentage(percentage)
              updateCorrectAnswer(correctAnswers)
            } else {
              setShowNextQuestion(true)
              updateTotal(data.length)
              setSelectedOptions(id)
              updateInCorrectAnswer(inCorrectAnswers)
            }
          }
        }

        return (
          <>
            <div className="top-quiz-container">
              <div className="question-number-time-container">
                <div className="question-container">
                  <p className="question">Question</p>
                  <p className="question-number">
                    {currentQuestion + 1}/{data.length}
                  </p>
                </div>
                <div className="time-container">
                  <p className="timer">{timeLeft}</p>
                </div>
              </div>
              <div className="question-name-container">
                <p className="question-name">
                  {data[currentQuestion].questionText}
                </p>
                {data[currentQuestion].optionsType === 'DEFAULT' && (
                  <ul className="answer-section">
                    {data[currentQuestion].options.map(eachAnswer => (
                      <QuizAnswer
                        answerDetails={eachAnswer}
                        key={eachAnswer.id}
                        checkAnswer={checkAnswer}
                        showNextQuestion={showNextQuestion}
                        selectedOptions={selectedOptions}
                      />
                    ))}
                  </ul>
                )}
                {data[currentQuestion].optionsType === 'IMAGE' && (
                  <ul className="answer-section">
                    {data[currentQuestion].options.map(eachAnswer => (
                      <ImageAnswer
                        answerDetails={eachAnswer}
                        key={eachAnswer.id}
                        checkAnswer={checkAnswer}
                        showNextQuestion={showNextQuestion}
                        selectedOptions={selectedOptions}
                      />
                    ))}
                  </ul>
                )}
                {data[currentQuestion].optionsType === 'SINGLE_SELECT' && (
                  <ul className="single-select-answer-section">
                    {data[currentQuestion].options.map(eachAnswer => (
                      <SingleSelectAnswer
                        answerDetails={eachAnswer}
                        key={eachAnswer.id}
                        checkAnswer={checkAnswer}
                        showNextQuestion={showNextQuestion}
                        selectedOptions={selectedOptions}
                      />
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="next-question-container">
              <button
                className={
                  showNextQuestion ? 'next-question nxtHover' : 'next-question'
                }
                type="button"
                onClick={onClickNextQuestion}
              >
                {currentQuestion === data.length - 1
                  ? 'Submit'
                  : 'Next Question'}
              </button>
            </div>
          </>
        )
      }}
    </ScoreContext.Consumer>
  )

  const renderApiStatusView = apiStatus => {
    switch (apiStatus) {
      case apiStatusConstant.success:
        return renderSuccessView()
      case apiStatusConstant.failure:
        return renderFailureView()
      case apiStatusConstant.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return (
    <div className="quizGame-app-container">
      <Header />
      {data.length > 0 && (
        <>
          <div className="quizGame-container">
            {renderApiStatusView(apiStatus)}
          </div>
        </>
      )}
    </div>
  )
}

export default QuizGame
