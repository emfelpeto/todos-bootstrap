import { ListTitle } from './Components/ListTitle';
import { TodoItem } from './Components/TodoItem';
import { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

export default function App() {
   // const initial = [
   //    { id: crypto.randomUUID(), task: "Complete homework assignment", completed: false },
   //    { id: crypto.randomUUID(), task: "Go for a run", completed: false },
   //    { id: crypto.randomUUID(), task: "Buy groceries", completed: true },
   //    { id: crypto.randomUUID(), task: "Call mom", completed: false },
   //    { id: crypto.randomUUID(), task: "Read a chapter of a book", completed: true },
   //    { id: crypto.randomUUID(), task: "Write a blog post", completed: false }
   //  ];

   const LOCALTORAGEKEY = 'todoApp.todo';
   const localTodos = localStorage.getItem(LOCALTORAGEKEY);

   const [todos, setTodos] = useState(JSON.parse(localTodos) || []);

   const [error, setError] = useState('');
   const todoInputRef = useRef();

   useEffect(() => {
      todos.length === 0 ? (fetch('https://jsonplaceholder.typicode.com/users/1/todos')
      .then(response => response.json())
      .then(json => setTodos(json))) : null
   }, []);

   useEffect(() => {
      localStorage.setItem(LOCALTORAGEKEY, JSON.stringify(todos));
   }, [todos]);

   const handleAddItem = (e) => {
      e.preventDefault();
      if (todoInputRef.current.value !== '') {
         setTodos((prevTodos) => {
            return [...prevTodos, {id: crypto.randomUUID(), title: todoInputRef.current.value, completed: false}]
         })
         todoInputRef.current.value = null;
         todoInputRef.current.focus()
      } else {
         setError('Please provide a task.');
         todoInputRef.current.focus()
      }
   }

   const handleInputTodo = (e) => {
      (e.target.value !== '') ? setError('') : null;
   }

   const handleAllCompleted = () => {
      const tempTodos = todos.map(todo => ({ ...todo, completed: true }));
      setTodos(tempTodos);
   }

   const handleAllDelete = () => {
      const tempTodos = todos.filter(todo => !todo.completed);
      setTodos(tempTodos);
   }

   const handleComplete = (id) => {
      const tempTodos = [...todos];
      const todo = tempTodos.find(todo => todo.id === id);
      todo.completed = !todo.completed;
      setTodos(tempTodos);
   }

   const handleDelete = (id) => {
      const tempTodos = todos.filter(todo => todo.id !== id);
      setTodos(tempTodos);
   }

   return (
      <div className='container-sm border border-secondary rounded p-3 mt-5'>
         <h1 className='display-6 text-center mb-3'>TODO LIST</h1>
         <form className='mb-3' onSubmit={handleAddItem}>
            <div className={`input-group mb-1 ${error !== '' ? 'border rounded border-danger' : null}`}>
               <input type="text" className="border border-0 form-control bg-body-tertiary shadow-none" ref={todoInputRef} placeholder='Add Item' aria-describedby="Input for add a todo" onChange={handleInputTodo} />
               <button className="btn btn-primary d-flex align-items-center" type="submit" aria-label='Button for add a todo item' title='Add item to list'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                     <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                  </svg>
               </button>
            </div>
            {error && <p className="font-monospace text-danger-emphasis">{error}</p>}
         </form>

         {/* TODO LIST */}
         {todos.filter(todo => !todo.completed).length !== 0 && (<div className='todo-list-container row gy-2 mx-0'>
            <div className='d-flex align-items-center justify-content-between'>
               <ListTitle>TO DO [{todos.filter(todo => !todo.completed).length}]</ListTitle>
               <button type="button" className="btn btn-outline-success border-0 opacity-75" title='Mark all as completed' onClick={handleAllCompleted}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-all" viewBox="0 0 16 16">
                     <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z"/>
                  </svg>
               </button>
            </div>
            {todos.map((todo) => (
               !todo.completed ? <TodoItem key={todo.id} todo={todo} handleComplete={handleComplete} handleDelete={handleDelete}/> : null
            ))}
         </div>)}

         {/* COMPLETED LIST */}
         {todos.filter(todo => todo.completed).length !== 0 && (<div className='todo-completed-container row gy-2 mx-0 mt-3'>
            <div className='d-flex align-items-center justify-content-between'>
               <ListTitle>COMPLETED [{todos.filter(todo => todo.completed).length}]</ListTitle>
               <button type="button" className="btn btn-outline-danger border-0 opacity-50" title='Delete all completed' onClick={handleAllDelete}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                     <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"></path>
                  </svg>
               </button>
            </div>
            {todos.map((todo) => (
               todo.completed ? <TodoItem key={todo.id} todo={todo} handleComplete={handleComplete} handleDelete={handleDelete}/> : null
            ))}
         </div>)}
      </div>
  )

}