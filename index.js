var state = {
    count: 1
};
var listeners = [];
function subscribe(listener) {
    listeners.push(listener);
}
function changeCount(count) {
    state.count = count;
    for (var i = 0; i < listeners.length; i++) {
        listeners[i]();
    }
}
subscribe(function () {
    console.log(state.count);
});
changeCount(1);
changeCount(2);
changeCount(3);
