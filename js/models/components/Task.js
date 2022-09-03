import html from "../../cores/cores.js"
import { connector } from "../../main.js"


function Task(state, weekDay, index) {
    const task = state.tasks[weekDay][index]
    const editedTask = state.editedTask

    if (state.filterFuncs[state.filter](task)) {
        return html`
            <div class="daily-task row ${task.complete ? 'completed': ''}">
                <div class="daily-task-main row">
                    <input onclick="dispatch('toggleTaskState', '${weekDay}', ${index})" type="checkbox" class="daily-task-main__check-box" ${task.complete ? 'checked' : ''}>
                    <div class="daily-task-main__title"
                        id='task-title-${weekDay}-${index}'
                        onkeyup="if (event.key==='Enter') dispatch('updateTask', '${weekDay}', ${index})"
                        onblur="dispatch('updateTask', '${weekDay}', ${index})"
                        onclick="dispatch('openWorkingModal', '${weekDay}', ${index})"
                        contenteditable="${editedTask && editedTask === task ? 'true' : 'false' }" >
                        ${task.title}
                    </div>
                </div>
                <div class="daily-task-config row">
                    <span onclick="dispatch('enableEditTask', '${weekDay}', ${index})" class="daily-task-config__option"><i class="fa-solid fa-gear"></i></span>
                    <span onclick="dispatch('deleteTask', '${weekDay}', ${index})" class="daily-task-config__option"><i class="fa-solid fa-trash"></i></span>
                </div>
            </div>
        `
    } else {
        return ''
    }
}


export default connector(Task)
