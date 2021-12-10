import { LOGGEDIN } from "./constants"

export const setCurrentUser= (currUser) => {
    return {
        type: LOGGEDIN,
        payload: currUser
    }
}

export default setCurrentUser;