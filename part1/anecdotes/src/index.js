import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}


const App = (props) => {
  const n = props.anecdotes.length
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(n).fill(0))

  const updateArray = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const updateMostVotes = () => {
    let index = 0
    let m = 0
    for (let i = 0; i < n; i++) {
      if (votes[i] > m) {
        m = votes[i]
        index = i
      }
    }

    return (
      <div>
        {props.anecdotes[index]}<br/>
        has {votes[index]} votes
      </div>
    )
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}<br/>
      has {votes[selected]} votes<br/>
      <Button handleClick={updateArray} text="vote" />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * n))} text="next anecdote"/>
      <h1>Anecdote with most votes</h1>
      {updateMostVotes()}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />, document.getElementById('root')
)