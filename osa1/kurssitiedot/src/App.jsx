const Header = ({ course }) => {
  console.log(course)
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const Part = ({ part, exercises }) => {
  return (
    <div>
      <p>{part} {exercises}</p>
    </div>
  )
}

const Content = ({ parts }) => {
  console.log(parts)
  const items = parts.map((part) => 
    <Part key={part.name} part={part.name} exercises={part.exercises} />
  )

  return (
    <div>
      {items}
    </div>
  )
}

const Total = ({ parts }) => {
  console.log(parts)
  let total = 0
  parts.forEach(part => {
    total += part.exercises
  })
  
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App