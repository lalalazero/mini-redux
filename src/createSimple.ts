export const createStoreSimple = (initState: any) => {
    let state = initState 
    let listeners: Function[] = []

    function subscribe(listener: Function) {
        listeners.push(listener)

        return function unsubscribe(){
            let index = listeners.indexOf(listener)
            listeners.splice(index, 1)
        }
    }

    function getState(){
        return state
    }

    function notify(){
        for(let i = 0; i < listeners.length; i++){
            listeners[i]()
        }
    }

    function setState(newState: any){
        state = newState
        notify()
    }

    return {
        getState,
        setState,
        subscribe
    }
}