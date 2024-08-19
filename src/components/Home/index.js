import Header from '../Header'
import ScoreContext from '../../context/ScoreContext'
import './index.css'

const Home = props => {
  return (
    <div className="bg-Home-container">
      <Header />

      <ScoreContext.Consumer>
        {value => {
          const {removeAllScore} = value

          const onClickStartButton = () => {
            const {history} = props
            removeAllScore()
            history.replace('/quiz-game')
          }

          return (
            <div className="home-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png"
                alt="start quiz game"
                className="start-quiz-image"
              />
              <h1 className="home-heading">
                How Many Of These Questions Do You Actually Know?
              </h1>
              <p className="home-paragraph">
                Test yourself with these easy quiz questions and answers
              </p>
              <button
                className="start-button"
                type="button"
                onClick={onClickStartButton}
              >
                Start Quiz
              </button>
              <div className="warning-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-error-img.png"
                  alt="warning icon"
                  className="warning-image"
                />
                <p className="warning-msg">
                  All the progress will be lost, if you reload during the quiz
                </p>
              </div>
            </div>
          )
        }}
      </ScoreContext.Consumer>
    </div>
  )
}

export default Home
