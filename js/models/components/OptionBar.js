import html from "../../cores/cores.js"
import { connector } from "../../main.js"


function OptionBar(state) {
    return html`
        <div class="option-bar-container">
            <div class="option-bar-symbol btn">
                <i class="fa-solid fa-gear"></i>
            </div>
            <div class="option-bar">
                <div class="option-bar__element btn" onclick="dispatch('stopSound')">
                    <i class="fa-solid fa-volume-xmark"></i>
                </div>
                <div class="option-bar__element btn" onclick="dispatch('removeAll')">
                    <i class="fa-solid fa-trash"></i>
                </div>
                <div class="option-bar__element btn" onclick="dispatch('clearAllDoneTasks')">
                    <i class="fa-solid fa-arrows-rotate"></i>
                </div>
                <div class="option-bar-dropdown">
                    <div class="option-bar-dropdown-symbol btn">
                        <i class="fa-solid ${state.filter === 'all' ? 'fa-list' : 'fa-list-check'}"></i>
                    </div>
                    <div class="option-bar-dropdown-option-container">
                        <div 
                            onclick="dispatch('changeFilter', 'all')" 
                            class="option-bar-dropdown__element btn ${state.filter === 'all' ? 'option-bar-dropdown__element--active': ''}">
                            <i class="fa-solid fa-list"></i>
                        </div>
                        <div 
                            onclick="dispatch('changeFilter', 'notComplete')"
                            class="option-bar-dropdown__element btn ${state.filter === 'notComplete' ? 'option-bar-dropdown__element--active': ''}">
                            <i class="fa-solid fa-list-check"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}


export default connector(OptionBar)
