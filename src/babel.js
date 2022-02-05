async function start() {
   return await Promise.resolve('async is working')
}
start().then(console.log);

class util {
    static id = Date.now()
}
console.log(util.id)

import('lodash').then()