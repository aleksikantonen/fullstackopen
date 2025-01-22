const Course = ({ course }) => {
    console.log(course)
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
      </div>
    )
  }
  
  const Header = ({ course }) => {
    console.log(course)
    return (
      <div>
        <h2>{course}</h2>
      </div>
    )
  }
  
  const Content = ({ parts }) => {
    console.log(parts)
    const items = parts.map((part) => 
        <Part key={part.id} part={part.name} exercises={part.exercises} />
    )
  
    return (
      <div>
        {items}
        <Total parts={parts} />
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
  
  const Total = ({ parts }) => {
    console.log(parts)
    const total = 
      parts.reduce( (previous, current) => previous + current.exercises, 0 )
    
    return (
      <div>
        <strong>total of {total} exercises</strong>
      </div>
    )
  }

  export default Course