import html from "../../cores/cores.js"
import { connector } from "../../main.js"


function AddNewTaskModal(state) {
    const weekDays = Object.keys(state.tasks)
    const addedWeekDay = state.addedWeekDay

    const capitalizeWeekDay = (weekDay) => {
        return weekDay.charAt(0).toUpperCase() + weekDay.slice(1)
    }

    const $ = document.querySelector.bind(document)

    return html`
            <div class="new-task-modal ${state.modal == 'addNewTask' ? 'active': ''}">
                <div class="new-task-modal__title">New Task</div>
                <div class="new-task-modal__form modal-form">
                    <div class="modal-input">
                        <div class="modal-input__label">Task Title</div>
                        <input id="new-task-title" 
                            type="text" class="modal-input__text" 
                            placeholder="Enter the task's name" value="" 
                            onkeyup="if(event.key==='Enter') dispatch('createNewTask')"
                            autofocus>
                    </div>
                    <div class="modal-input">
                        <div class="modal-input__label">Day</div>
                        <select id='new-task-week-day' class="modal-input__select">
                            ${weekDays.map(weekDay => '<option value=\''+ weekDay +'\' ' + (addedWeekDay === weekDay ? 'selected' : '') + '>' + (capitalizeWeekDay(weekDay)) + '</option>')}
                        </select> 
                    </div>
                </div>
                <div class="modal-btn-group">
                    <div class="btn--ok btn" onclick=dispatch('createNewTask')>Create</div>
                    <div onclick="dispatch('removeAllModals')" class="btn--cancel btn">Cancel</div>
                </div>
            </div>
    `
}


export default connector(AddNewTaskModal)
