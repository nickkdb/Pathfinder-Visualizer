const colorMap = {
    "start": "#23eb3a",
    "end": "#db2a16",
    "blocker": "#4f4f4f",
    "found": "#a627f5",
    "seen": "#349eeb",
    "recurse": "#f011d6"
}

let found = false;

export const setState = (id, state) => {
    // use the id of the element to get it from the document
    //change to matching color based on if it's a start/end/blocker, etc.
    const elem = document.getElementById(id);
    elem.style.backgroundColor = colorMap[state];
    elem.setAttribute("data-type", state);
}
export const clearCell = (id) => {
    const elem = document.getElementById(id);
    elem.style.backgroundColor = 'transparent';
    elem.setAttribute("data-type", 'empty');
}

export const resetBoard = () => {
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 30; j++) {
            const elem = document.getElementById(`${i}-${j}`);
            elem.style.backgroundColor = "transparent";
            elem.setAttribute('data-type', 'empty');
        }
    }
    found = false;
}
export const resetBlockers = () => {
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 30; j++) {
            const elem = document.getElementById(`${i}-${j}`);
            if (elem.getAttribute('data-type') === "blocker") {
                clearCell(`${i}-${j}`);
            }
        }
    }
}

export const DFS = async (point) => {
    if (found) return;
    
    await timeout(10);

    const elem = document.getElementById(point);

    if (elem === null) return; // move on if item doesnt exist (aka out of bounds of our grid)

    const type = elem.getAttribute('data-type');

    if (type === "seen" || type === "blocker") return; // check if node is visited

    // if we found what we're looking for 

    if (type === 'end') {
        elem.setAttribute('data-type', 'found');
        elem.style.backgroundColor = colorMap["found"];
        found = true;
        return;
    }

    //reaching here means the node must have been empty aka nonvisited
    elem.setAttribute('data-type', 'seen');
    elem.style.backgroundColor = (type === "start") ? colorMap['start'] : colorMap["seen"]; //guarantees start stays green the entire execution
    
    const x = parseInt(point.substring(0, point.indexOf("-")));
    const y = parseInt(point.substring(point.indexOf("-") + 1, point.length));

    const down  = `${x+1}-${y}`;
    const up    = `${x-1}-${y}`;
    const left  = `${x}-${y-1}`;
    const right = `${x}-${y+1}`;

    await DFS(up);
    await DFS(right);
    await DFS(down);
    await DFS(left);

    if (!found) elem.style.backgroundColor = colorMap["recurse"];
    return;
}

export const BFS = async (point) => {


    const nodeArray = []; //create a queue to hold our nodes
    nodeArray.push(point); //begin with start node


    while (nodeArray.length > 0) {

        await timeout(1); //pause execution so we can see the visualization

        const id = nodeArray.shift(); //grab first item in queue

        const elem = document.getElementById(id); //get ID of first item in node & element associated with it

        if (elem === null) continue; // move on if item doesnt exist (aka out of bounds of our grid)

        const type = elem.getAttribute('data-type');

        if (type === "seen" || type === "blocker") continue; // check if node is visited

        // if we found what we're looking for 

        if (type === 'end') {
            elem.setAttribute('data-type', 'found');
            elem.style.backgroundColor = colorMap["found"];
            return;
        }

        //reaching here means the node must have been empty aka nonvisited
        elem.setAttribute('data-type', 'seen');
        elem.style.backgroundColor = (type === "start") ? colorMap['start'] : colorMap["seen"]; //guarantees start stays green the entire execution

        //isolate numbers from our id string so we can do math to its position in our 2D grid
        const x = parseInt(id.substring(0, id.indexOf("-")));
        const y = parseInt(id.substring(id.indexOf("-") + 1, id.length));  

        //push all neighbors of the node to our queue
        nodeArray.push(`${x+1}-${y}`);
        nodeArray.push(`${x-1}-${y}`);
        nodeArray.push(`${x}-${y-1}`);
        nodeArray.push(`${x}-${y+1}`);
    }


}

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

export const beginDFS = (start) => {

    const x = parseInt(start.substring(0, start.indexOf("-")));
    const y = parseInt(start.substring(start.indexOf("-") + 1, start.length));

    const up    = `${x+1}-${y}`;
    const down  = `${x-1}-${y}`;
    const left  = `${x}-${y-1}`;
    const right = `${x}-${y+1}`;

    DFS(up);
    DFS(down);
    DFS(left);
    DFS(right);

    return;
}

export const beginBFS = () => {
    return;
}