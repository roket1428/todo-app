import { useEffect, useRef, useState } from "react"
import TodoItem from './components/TodoItem.jsx'

function App() {
  // todolar ve onların durumlarını iki ayrı state olarak tutuyorum
  const [todos, setTodos] = useState([]);
  const todosDone = useRef([]);

  // test case'de verilen api ile 15 tane todo çekiyorum
  useEffect(() => {
    fetch('https://dummyjson.com/todos?limit=15')
      .then(res => res.json())
      .then(data => {
        let todoList = []
        let doneList = []
        data["todos"].forEach(v => {
          let newTodo = TodoItem(v["todo"], v["id"], todosDone);
          todoList.push(newTodo);
          doneList.push(v["completed"]);
        })
        setTodos([...todoList, ...todos]);
        todosDone.current = [...todosDone.current, ...doneList]
      })
  }, [])

  // custom todo ekleme fonksiyonu
  const addTodo = () => {
    let todoName = document.getElementById("todo-input").value;
    if (todoName == "") {
      return;
    }
    let newTodo = TodoItem(todoName, todos.length + 1, todosDone);
    setTodos([newTodo, ...todos])
    todosDone.current = [...todosDone.current, false];
  }

  // yeni todolar eklenince checkbox state'i güncelliyoruz
  useEffect(() => {
    let todoCheckboxes = document.querySelectorAll(".todo-checkbox");
    for (let i = 0; i < todoCheckboxes.length; i++) {
      todoCheckboxes[i].checked = todosDone.current[todoCheckboxes[i].attributes.id.value - 1];
    }
  }, [todos])

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-5 pt-10">
      <h1 className="px-3 py-5 text-4xl">ToDo App</h1>
      <div className="flex">
        <input className="p-1 mr-3 text-lg border border-black rounded-md" type="text" name="todo-input" id="todo-input" placeholder="add a todo" />
        <button className="p-1 border border-black rounded-md" onClick={addTodo}>Add a ToDo</button>
      </div>
      <h2 className="px-3 py-5 text-2xl">ToDo List:</h2>
      <div className="grid grid-cols-3">
        {todos.map((v, i) => {
          return (
            <div className="px-5 py-3 m-2 border border-black rounded-md" key={i}>
              {v}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
