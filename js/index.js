import html from "./cores/cores.js";
import DailyTask from "./models/components/DailyTask.js"
import { storage, mount, dispatch, connector } from "./main.js";
import AddNewTaskModal from "./models/components/AddNewTaskModal.js";
import LearningModal from "./models/components/LearningModal.js";
import OptionBar from "./models/components/OptionBar.js";


const app = document.querySelector("#app")

function App(state) {
    const weekDayNames = Object.keys(state.tasks)

    const func = (e) => {
        e.stopPropagation()
        console.log(e)
    }

    return html`
        <div class="container">
            <div class="to-do-container row">
                ${weekDayNames.map((curr) => DailyTask(curr))}
            </div>
            <div onclick="event.stopPropagation(); if(event.target.classList.contains('modal')) dispatch('removeAllModals')" class="modal ${state.modal !== null ? 'active': ''}">
                ${AddNewTaskModal()}
                ${LearningModal()}
            </div>
            <audio autoplay ${state.needSound ? '': 'muted'}><source src="../to-do-pomodoro-app/sound/finish.mp3"/></audio>
            ${OptionBar()}
        </div>
    `
}

mount.call(storage, app, connector(App))

window.dispatch = dispatch.bind(storage)


//<audio autoplay ${state.needSound ? '': 'muted'}><source src="../sound/finish.mp3"/></audio>
