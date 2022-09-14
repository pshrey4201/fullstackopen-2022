import { useState } from 'react'

const Heading = ( {text} ) => <h1>{text}</h1>
const Paragraph = ( {text} ) => <p>{text}</p>

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const Statistics = ({ good, bad, neutral} ) => {

  return (
    <>
      <Heading text="Statistics" />
      <Paragraph text={"good " + good} />
      <Paragraph text={"neutral " + neutral} />
      <Paragraph text={"bad " + bad} />
      <Paragraph text={"all " + (good + neutral + bad)} />
      <Paragraph text={"average " + ((good + bad + neutral == 0) ? 0 : ((good + (-1 * bad))/(good + bad + neutral)))} />
      <Paragraph text={"positive " + ((good + bad + neutral == 0) ? 0 : ((good/(good + bad + neutral)) * 100)) + " %"} />
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
