import logger from "../utils/logger.js"

export default function html([firstString, ...rawStrings], ...data) {
    if (rawStrings.length === 0) {
        return firstString
    } else {
        if (Array.isArray(data[0])) {
            data[0] = data[0].join(' ')
        }
        const nextString = firstString + data[0] + rawStrings[0]
        return html([nextString, ...rawStrings.slice(1)], ...data.slice(1))
    }
}


export function Storage(reducer) {
    let state = null
    let root = null 
    let component = null

    return {
        mount(root, component) {
            this.root = root
            this.component = component 
            this.state = reducer()
            this.render()
        },
        render() {
            this.root.innerHTML = this.component(this.state) 
        },
        connector(component) {
            return (...args) => component(this.state, ...args)
        },
        dispatch(e, ...args) {
            this.state = reducer(this.state, e, ...args)
            this.render()
        }
    }
}
