import { useState, useEffect } from "react"
import { Card } from "../../componentes/Card"
import "./style.css"

export function Home() {
  const [user, setUser] = useState({ name: "", avatar: ""})
  const [studentName, setStudentName] = useState("")
  const [students, setStudents] = useState([])

  useEffect(() => {
     async function fecthData() {
       const response = await fetch("https://api.github.com/users/gabrielmotagg")
       const data = await response.json()
    
      setUser({
        name: data.name,
        avatar: data.avatar_url
      }) 
    }

    fecthData()
  }, [])

  function handleAddStudent() {
    if (!studentName) {
      alert("O nome Precisa ser preenchido!")
      return;
    }
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br",{
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit" 
      }) 
    }
    setStudents([...students, newStudent])
  }
  
  return (
    <div className="container">
      <header>
        <h1>Lista de Presença: {studentName}</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar}/>
        </div>
      </header>

      <input 
        type="text" 
        placeholder="Digite o nome ..." 
        onChange={(e) => {setStudentName((e.target.value))}}
      />
      <button onClick={handleAddStudent}>Adicionar</button>

      {students.map((student) => (
        <Card key={student.time} name={student.name} time={student.time} />
      ))}

    </div>
  )
}

