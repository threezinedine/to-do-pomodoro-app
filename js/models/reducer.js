import {dispatch} from "../main.js"
import { TASKS_KEY, FILTER, getLocalStorage, saveLocalStorage } from "../utils/storage.js"
import { EMPTY_TASKS } from "./data.js"

const $ = document.querySelector.bind(document)


function updateWorking () {
    dispatch('updateWorkingMode')
}


const initState = {
    modal: null,
    addedWeekDay: null,
    editedTask: null,
    running: false,
    workingTask: null,
    workingWeekDay: null,
    needSound: false,
    workingIndex: null,
    shortBreakTime: null,
    longBreakTime: null,
    numTasks: 0,
    intervalId: null,
    workingMode: 'working',
    filter: getLocalStorage(FILTER),
    filterFuncs: {
        all: (task) => true,
        complete: (task) => task.complete,
        notComplete: (task) => !task.complete,
    },
    tasks: getLocalStorage(TASKS_KEY)
}


const methods = {
    openAddNewTaskModal(state, weekDay) {
        state.modal = 'addNewTask'
        state.addedWeekDay = weekDay
        setTimeout(() => {
            $('#new-task-title').focus()
        }, 200)
        return state
    },
    removeAllModals(state) {
        state.modal = null 
        state.addedWeekDay = null
        state.editedTask = null
        return state
    },
    createNewTask(state) {
        const title = $('#new-task-title').value
        const weekDay = $('#new-task-week-day').value
        state.tasks[weekDay].push(
            {
                title: title,
                complete: false
            }
        )
        saveLocalStorage(TASKS_KEY, state.tasks)
        return this.removeAllModals(state)
    },
    toggleTaskState(state, weekDay, index) {
        state.tasks[weekDay][index].complete = !state.tasks[weekDay][index].complete
        saveLocalStorage(TASKS_KEY, state.tasks)
        return state
    },
    deleteTask(state, weekDay, index) {
        state.tasks[weekDay].splice(index, 1)
        saveLocalStorage(TASKS_KEY, state.tasks)
        return state
    },
    enableEditTask(state, weekDay, index) {
        state.editedTask = state.tasks[weekDay][index]
        setTimeout(() => {
            const task = $(`#task-title-${weekDay}-${index}`)
            console.log(task)
            task.focus()
        }, 100)
        return state
    },
    updateTask(state, weekDay, index) {
        state.editedTask.title = $(`#task-title-${weekDay}-${index}`).innerHTML
        saveLocalStorage(TASKS_KEY, state.tasks)
        return this.removeAllModals(state)
    },
    startWorking(state) {
        state.needSound = false
        state.running = !state.running
        if (state.running) {
            state.intervalId = setInterval(updateWorking, 1000)
        } else {
            clearInterval(state.intervalId)
            state.intervalId = null
        }
        return state
    },
    updateWorkingMode(state) {
        if (state.running) {
            switch(state.workingMode) {
                case 'working': 
                    state.workingTask.remainTime -= 1 
                    if (state.workingTask.remainTime === 0) {
                        state.needSound = true
                        setTimeout(()=> {
                            state.needSound = false
                        }, 100)
                        state.workingTask.complete = true
                        state.numTasks += 1
                        state.running = false
                        state.workingMode = state.numTasks % 4 !== 0 ? 'short break' : 'long break'
                        clearInterval(state.intervalId)
                        $('audio').play()
                        while (state.workingTask.complete) {
                            if (state.workingIndex + 1 < state.tasks[state.workingWeekDay].length) {
                                state = this.openWorkingModal(state, state.workingWeekDay, state.workingIndex + 1)
                            } else {
                                state = this.removeAllModals(state)
                                break
                            }
                        }
                    }
                    saveLocalStorage(TASKS_KEY, state.tasks)
                    break
                case 'short break':
                    state.shortBreakTime -= 1
                    if (state.shortBreakTime === 0) {
                        state.needSound = true
                        setTimeout(()=> {
                            state.needSound = false
                        }, 100)
                        state.running = false 
                        state.workingMode = 'working' 
                        state.shortBreakTime = null
                        clearInterval(state.intervalId)
                    }
                    break
                case 'long break':
                    state.longBreakTime -= 1
                    if (state.longBreakTime === 0) {
                        state.needSound = true
                        setTimeout(()=> {
                            state.needSound = false
                        }, 100)
                        state.running = false 
                        state.workingMode = 'working'
                        state.longBreakTime = null
                        clearInterval(state.intervalId)
                    }
                    break
            }
        }
        return state
    },
    openWorkingModal(state, weekDay, index) {
        if (state.editedTask === null) {
            state.workingTask = state.tasks[weekDay][index]
            state.workingWeekDay = weekDay
            state.workingIndex = index
            state.modal = 'working'
        } else {
            this.enableEditTask(state, weekDay, index)
        }
        return state
    },
    changeMode(state, workingMode) {
        state.workingMode = workingMode
        state.running = false
        return state
    },
    stopSound(state) {
        state.needSound = false
        return state
    },
    removeAll(state) {
        state.tasks = EMPTY_TASKS
        saveLocalStorage(TASKS_KEY, state.tasks)
        return state
    },
    clearAllDoneTasks(state) {
        for (const weekDay in state.tasks) {
            state.tasks[weekDay].forEach((curr) => {
                curr.complete = false
            })
        } 
        saveLocalStorage(TASKS_KEY, state.tasks)
        return state
    },
    changeFilter(state, filter) {
        state.filter = filter
        saveLocalStorage(FILTER,state.filter)
        return state
    }
}


export default function reducer(state = initState, e, ...args) {
    methods[e] && methods[e](state, ...args)
    return state
}
