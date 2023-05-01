
export function setViewportSize(elemento){
    const viewportBlockSize = getViewport()
    elemento.style.blockSize = `${viewportBlockSize}px` 
    
}

export function getViewport(){
    return window.innerHeight
}

export function onViewportResize(callback){
    window.addEventListener('resize', callback)

}

export function offViewportResize(callback){
    window.addEventListener('resize', callback)
}


export function viewportSize(elemento){
    setViewportSize(elemento)

    onViewportResize(() => setViewportSize(elemento))

}