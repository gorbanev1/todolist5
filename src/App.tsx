import './App.css'
import {useState} from 'react'
import {v1} from 'uuid'
import {TodolistItem} from './TodolistItem'

export type Task = {
    id: string
    title: string
    isDone: boolean
}
export type TaskState={
    [key: string]:Task[]
}
export type TaskState=Record<string, Task[]>
export type Todolist = {
    id: string,
    title: string
    filter: FilterValues
}

export type FilterValues = 'all' | 'active' | 'completed'
const todolist1Id = v1()
const todolist2Id = v1()

export const App = () => {
    // const [filter, setFilter] = useState<FilterValues>('all')
    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolist1Id, title: "Адын", filter: 'all'},
        {id: todolist2Id, title: "Дыва", filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TaskState>({
        [todolist1Id]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolist2Id]: [
            {id: v1(), title: 'sdfdsf', isDone: true},
            {id: v1(), title: 'sdf', isDone: true},
            {id: v1(), title: 'sdfsad', isDone: false},
        ]
    })

    const deleteTask = (todolistId: string, taskId: string) => {
        const newTasks = tasks[todolistId]
        const filteredTasks = newTasks.filter(task => {
            return task.id !== taskId
        })
        tasks[todolistId] = filteredTasks
        setTasks({...tasks})
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        console.log(todolistId)
        const newTodolists = todolists.map(tdl => {
            return tdl.id === todolistId ? {...tdl, filter} : tdl
        })
        setTodolists(newTodolists)

    }


    const createTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        debugger
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})

    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId) => {
        // const newTasks=tasks[todolistId].map(task=>task.id===taskId?{...task, isDone}:task)
        // tasks[todolistId]=newTasks
        // const newState = tasks.map(task => task.id == taskId ? {...task, isDone} : task)
        debugger
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)})
    }
    const deleteTodolist = (todolistId) => {
        setTodolists(todolists.filter(tdl => tdl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    return (
        <div className="app">
            {todolists.map((tdl) => {
                    let filteredTasks = tasks[tdl.id]

                    if (tdl.filter === "active") filteredTasks = filteredTasks.filter(t => !t.isDone)
                    if (tdl.filter === "completed") filteredTasks = tasks[tdl.id].filter(t => t.isDone)
                    /*                      switch (tdl.filter) {
                                            case: "active":
                                              filteredTasks=filteredTasks.filter(t=>!t.isDone)
                                            case: "completed":
                                              filteredTasks=tasks.filter(t=>t.isDone)
                                          }*/

                    return (
                        <TodolistItem
                            deleteTodolist={deleteTodolist}
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
