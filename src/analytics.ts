import * as $ from 'jquery'
function createAnalitics(): object {
    let counter = 0
    let destroyed = false
    const listener = ():number => counter++
    //document.addEventListener('click', listener)
    $(document).on('click', listener)
    return {
        destroy() {
            //document.removeEventListener('click', listener)
            $(document).off('click', listener)
            destroyed = true
        },
        getClicks() {
            if (destroyed) {
                return 'destroy, total clicks = $(counter)'
            }
            return counter
        }
    }
}
window['analitycts'] = createAnalitics()