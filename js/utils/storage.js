import { EMPTY_TASKS } from "../models/data.js"
export const TASKS_KEY = "daily_tasks"
export const FILTER = "filter_key"


export function getLocalStorage(key) {
    const data = localStorage.getItem(key)
    if (data) {
        switch (key) {
            case TASKS_KEY:
                return JSON.parse(data)
            case FILTER:
                return data
        }
    } else {
        switch (key) {
            case TASKS_KEY: 
                return EMPTY_TASKS
            case FILTER:
                return "all"
        }
    }
}


export function saveLocalStorage(key, value) {
    if (value !== undefined) 
        localStorage.setItem(key, JSON.stringify(value))
}
