export default function logger(reducer) {
    return (state, e, ...args) => {
        console.group("Event", e)
        console.log("Previous state", state)
        console.log("Input args", args)

        state = reducer(state, e, ...args)

        console.log("Current State", state)
        console.groupEnd()
        return state
    }
}
