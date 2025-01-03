import { useState } from 'react'

const Header = ({ text }) => {
  console.log('Header props:', { text })

  return (
    <h1>{text}</h1>
  )
}

const Anecdotes = ({ text, votes }) => {
  console.log('Anecdotes props:', { text, votes })

  return (
    <div>
      <div>{text}</div>
      <div>has {votes} votes</div>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  console.log('Button props:', { handleClick, text })

    return (
      <button onClick={handleClick}>
        {text}
      </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const getRandomIndex = () => {
    return Math.floor(Math.random() * anecdotes.length)
  }

  const [selected, setSelected] = useState(getRandomIndex())
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleNext = () => {
    const random = getRandomIndex()
    setSelected(random)
    console.log('Random index after click:', random)
  }

  const handleVote = () => {
    const points = [...votes]
    points[selected] += 1
    setVotes(points)
    console.log(`Anecdote ${selected} after has now ${points[selected]} votes`)
  }
  
  return (
    <div>
      <Header text='Anecdote of the day' />
      <Anecdotes text={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={handleVote} text='vote' />
      <Button handleClick={handleNext} text='next anecdote' />
      <Header text='Anecdote with most votes' />
      <Anecdotes 
        text={anecdotes[votes.indexOf(Math.max(...votes))]} 
        votes={votes[votes.indexOf(Math.max(...votes))]}
      />
    </div>
  )
}

export default App