import {Route, Switch, Redirect} from 'react-router-dom'
import {useState} from 'react'
import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import QuizGame from './components/QuizGame'
import GameResult from './components/GameResult'
import GameReport from './components/GameReport'
import ScoreContext from './context/ScoreContext'

const App = () => {
  const [score, setScore] = useState(0)

  const [total, setTotal] = useState(0)

  const [unattendedQuestionList, setUnattendedQuestionList] = useState([])

  const [percentage, setPercentage] = useState(0)

  const [correctAnswers, setCorrectAnswer] = useState(0)

  const [inCorrectAnswers, setInCorrectAnswer] = useState(0)

  const [unattendedQuestion, setUnattendedQuestion] = useState(0)

  const updateScore = newScore => {
    setScore(newScore + 1)
  }

  const updateTotal = length => {
    setTotal(length)
  }

  const updateUnattendedQuestionList = unAttemptQuestionList => {
    setUnattendedQuestionList(prevState => [
      ...prevState,
      unAttemptQuestionList,
    ])
  }

  const updatePercentage = newPercentage => {
    setPercentage(newPercentage + 10)
  }

  const updateCorrectAnswer = newCorrectAnswer => {
    setCorrectAnswer(newCorrectAnswer + 1)
  }

  const updateIncorrectAnswer = newIncorrectAnswer => {
    setInCorrectAnswer(newIncorrectAnswer + 1)
  }

  const updateUnattendedQuestion = newUnattendedQuestion => {
    setUnattendedQuestion(newUnattendedQuestion + 1)
  }

  const removeAllScore = () => {
    setScore(0)
    setTotal(0)
    setUnattendedQuestion([])
    setCorrectAnswer(0)
    setInCorrectAnswer(0)
    setPercentage(0)
    setUnattendedQuestion(0)
  }

  return (
    <ScoreContext.Provider
      value={{
        score,
        total,
        percentage,
        correctAnswers,
        inCorrectAnswers,
        unattendedQuestion,
        unattendedQuestionList,
        updateScore: updateScore,
        updateTotal: updateTotal,
        updateUnattendedQuestionList: updateUnattendedQuestionList,
        updatePercentage: updatePercentage,
        updateCorrectAnswer: updateCorrectAnswer,
        updateInCorrectAnswer: updateIncorrectAnswer,
        updateUnattendedQuestion: updateUnattendedQuestion,
        removeAllScore: removeAllScore,
      }}
    >
      <>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/quiz-game" component={QuizGame} />
          <ProtectedRoute exact path="/game-results" component={GameResult} />
          <ProtectedRoute exact path="/game-report" component={GameReport} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </>
    </ScoreContext.Provider>
  )
}

export default App
