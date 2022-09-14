import { useState } from 'react'

const Heading = ({ text }) => <h1>{text}</h1>
const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const Statistics = ({ good, bad, neutral} ) => {
  if(good == 0 && bad == 0 && neutral == 0) return <p>No feedback given</p>
  return (
    <>
      <Heading text="Statistics" />
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={(good + neutral + bad)} />
          <StatisticLine text="average" value={((good + (-1 * bad))/(good + bad + neutral))} />
          <StatisticLine text="positive" value={(good/(good + bad + neutral) * 100) + " %"} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Heading text="give feedback" />
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App
