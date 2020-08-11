let state = {
    count: 1
}

let listeners: Function[] = []

function subscribe(listener: Function) {
    listeners.push(listener)
}

function changeCount(count: number) {
    state.count = count
    for(let i = 0; i < listeners.length; i++){
        listeners[i]()
    }
}

subscribe(() => {
    console.log(state.count)
})

changeCount(1)
changeCount(2)
changeCount(3)