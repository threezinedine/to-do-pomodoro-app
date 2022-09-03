import html from "../../cores/cores.js"
import { connector } from "../../main.js"
import { WORKING_TIME, SHORT_BREAK_TIME, LONG_BREAK_TIME } from "../data.js"


function LearningModal(state) {
    const fillFormat = (numberString) => {
        let result = numberString.toString()
        while (result.length < 2) {
            result = "0" + result
        }
        return result
    }

    const getTimeString = (remainTime) => {
        return `${fillFormat(Math.floor(remainTime / 60))}:${fillFormat(remainTime % 60)}`
    } 

    if (state.workingTask !== null) {
        const getTimeByMode = (state) => {
            switch (state.workingMode) {
                case 'working': 
                    if (! state.workingTask?.remainTime)
                        state.workingTask.remainTime = WORKING_TIME
                    return getTimeString(state.workingTask.remainTime)

                case 'short break':
                    if (state.shortBreakTime === null) {
                        state.shortBreakTime = SHORT_BREAK_TIME
                    }
                    return getTimeString(state.shortBreakTime)
                case 'long break':
                    if (state.longBreakTime === null) {
                        state.longBreakTime = LONG_BREAK_TIME
                    }
                    return getTimeString(state.longBreakTime)
            }
        }

        return html`
            <div class="learning-modal ${state.modal === 'working' ? 'active' : ''}">
                <div class="learning-modal__title">
                    Working - ${state.workingTask.title}
                </div>
                <div class="mode">
                    <div class="mode__element btn ${state.workingMode === 'working' ? 'mode__element--active' : ''}"
                        onclick="dispatch('changeMode', 'working')"
                        >
                        Working
                    </div>
                    <div class="mode__element btn ${state.workingMode === 'short break' ? 'mode__element--active' : ''}"
                        onclick="dispatch('changeMode', 'short break')"
                        >
                        Short break
                    </div>
                    <div class="mode__element btn ${state.workingMode === 'long break' ? 'mode__element--active' : ''}"
                        onclick="dispatch('changeMode', 'long break')"
                        >
                        Long break
                    </div>
                </div>
                <div class="learning-modal__digital-clock">
                    ${getTimeByMode(state)}
                </div>
                <div class="learning-modal__control-btn ${state.running ? 'learning-modal__control-btn--running' : ''} btn"
                    onclick="dispatch('startWorking')"
                    >
                    ${!state.running ? 'Start' : 'Stop'}
                </div>
            </div>
        `
    } else {
        return ""
    }
}


export default connector(LearningModal)
