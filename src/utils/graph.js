export const findConnections = (users,source,destination) => {

const adjacencyList = new Map();


function addNode(name){
  adjacencyList.set(name,[]);
}

function addEdge(origin,destination){
  adjacencyList.get(origin).push(destination);
  adjacencyList.get(destination).push(origin);
}

users.forEach(user => {
  addNode(user.name);
})

users.forEach(user => {
  user.friends.forEach(friend => {
    addEdge(user.name,friend);
  })
})
for(let [key,value] of adjacencyList){
  adjacencyList.set(key,[...new Set(value)]);
}

function bfs(adjacencyList, origin, destination){
    const visited = new Set();
    const q = [[origin]];
    const possibleRoutes = [];

    while(q.length > 0){
        const partialRoute = q.shift();
        const [name] = partialRoute.slice(-1);
        
        if(name === destination) {
            possibleRoutes.push(partialRoute);
            continue;
        }

        for(const neighbour of adjacencyList.get(name)){
            if(!visited.has(neighbour)) q.push([...partialRoute, neighbour]);
        }

        visited.add(name);
    }

    return possibleRoutes;
}

const result = bfs(adjacencyList,source,destination);

return result;
}