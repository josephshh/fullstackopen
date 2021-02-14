import React from 'react'

const Header = ({course}) => {
return (
    <h3>{course.name}</h3>
  )
}
  
const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}
  
const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}
  
const Total = ({parts}) => {
  const total = parts.reduce((s,p) => s + p.exercises, 0)
  return (
    <p><b>total of {total} exercises</b></p>
  )
}
  
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course