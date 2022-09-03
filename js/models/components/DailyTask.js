import html from "../../cores/cores.js"
import { connector } from "../../main.js"
import Task from "./Task.js"


function DailyTask(state, weekDay) {
    const tasks = state.tasks[weekDay]

    const dayTitle = weekDay[0].toUpperCase() + weekDay.slice(1)

    return html`
        <div class="to-do-daily col-eq">
            <div class="to-do-daily__title">${dayTitle}</div>
            <div class='to-do-tasks-container'>
                ${tasks.map((curr, index) => Task(weekDay, index))} 
            </div>
            <div onclick="dispatch('openAddNewTaskModal', '${weekDay}')" class="daily-add-task-btn btn">
                <i class="fa-solid fa-plus"></i>
                Add a new task
            </div>
        </div>
    `
}


export default connector(DailyTask)
