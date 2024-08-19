import React from 'react'

const ScoreContext = React.createContext({
  score: 0,
  total: 0,
  percentage: 0,
  correctAnswers: 0,
  inCorrectAnswers: 0,
  unattendedQuestion: 0,
  unattendedQuestionList: [],
  updateScore: () => {},
  updateTotal: () => {},
  updateUnattendedQuestionList: () => {},
  updatePercentage: () => {},
  updateCorrectAnswer: () => {},
  updateInCorrectAnswer: () => {},
  updateUnattendedQuestion: () => {},
  removeAllScore: () => {},
})

export default ScoreContext
