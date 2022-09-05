import { Storage } from "./cores/cores.js";
import reducer from "./models/reducer.js";
import logger from "./utils/logger.js";

export const storage = Storage(reducer)
let { mount, dispatch, connector } = storage

connector = connector.bind(storage)
dispatch = dispatch.bind(storage)

export { mount, connector, dispatch }
