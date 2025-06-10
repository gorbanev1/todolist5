import './App.css'
import {useState} from 'react'
import {v1} from 'uuid'
import {TodolistItem} from './TodolistItem'

export type Task = {
    id: string
    title: string
    isDone: boolean
}
export type Todolist = {
    id: string,
    title: string
    filter: FilterValues
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
    // const [filter, setFilter] = useState<FilterValues>('all')
    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: v1(), title: "Адын", filter: 'all'},
        {id: v1(), title: "Дыва", filter: 'all'},
    ])
    const [tasks, setTasks] = useState<Task[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ])

    const deleteTask = (taskId: string) => {
        const filteredTasks = tasks.filter(task => {
            return task.id !== taskId
        })
        setTasks(filteredTasks)
    }

    const changeFilter = (todolistId:string, filter: FilterValues) => {
      console.log(todolistId)
      const newTodolists= todolists.map(tdl=>{
              return tdl.id===todolistId ? {...tdl, filter}:tdl
            })
      setTodolists(newTodolists)

    }



    const createTask = (title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        const newState = tasks.map(task => task.id == taskId ? {...task, isDone} : task)
        setTasks(newState)
    }

    return (
        <div className="app">
            {todolists.map((tdl) => {
                    let filteredTasks=tasks
              if(tdl.filter==="active") filteredTasks=filteredTasks.filter(t=>!t.isDone)
              if(tdl.filter==="completed") filteredTasks=filteredTasks.filter(t=>t.isDone)
/*                      switch (tdl.filter) {
                        case: "active":
                          filteredTasks=filteredTasks.filter(t=>!t.isDone)
                        case: "completed":
                          filteredTasks=tasks.filter(t=>t.isDone)
                      }*/

                    return (
                        <TodolistItem
                            key={tdl.id}
                            todolist={tdl}
                            tasks={filteredTasks}
                            deleteTask={deleteTask}
                            changeFilter={changeFilter}
                            createTask={createTask}
                            changeTaskStatus={changeTaskStatus}

                        />)
                }
            )}
        </div>
    )
}
