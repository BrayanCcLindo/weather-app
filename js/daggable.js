const defaultConfig = {
    open:true, 
    debug: true, 
    animatable: true
}


export default function draggable($element, config = defaultConfig ){
    if(!($element instanceof HTMLElement)){
        return console.warn(`se esperaba un emento HTML pero se recibió un ${$element}`)
    }

    let isOpen = config.open
    let isDraggin = false

    const elementRect = $element.getBoundingClientRect()
    const ELEMENT_BLOCK_SIZE = elementRect.height
    const $marker = $element.querySelector('.weeklyWeather-marker')
    const MARKER_BLOCK_SIZE = $marker.getBoundingClientRect().height


     const VISIBLE_Y_POSITION = 0
     const HIDDEN_Y_POSITION = ELEMENT_BLOCK_SIZE - MARKER_BLOCK_SIZE
     let widgetPosition = VISIBLE_Y_POSITION
    isOpen ? open() : close()

    let startY = 0

    $marker.addEventListener('click', hadleClick)
    $marker.addEventListener('pointerup', hadlePointerUp)
    $marker.addEventListener('pointerdown', hadlePointerDown)
    $marker.addEventListener('pointerout', hadlePointerOut)
    $marker.addEventListener('pointercancel', hadlePointerCancel)
    $marker.addEventListener('pointermove', hadlePointerMove)
    if( config.animatable){
        return setAnimation()
    }


    function hadleClick(event){
        toggle()
    }

    function hadlePointerUp(){
        dragEnd()
    }

    function hadlePointerDown(event){
        startDrag(event)
    }

    function hadlePointerOut(){
        dragEnd()
    }

    function hadlePointerCancel(){
        dragEnd()
    }

    function hadlePointerMove(event){
       drag(event) 
    }

    //funciones para events listener

    function pageY(event){
        return event.pageY || event.touches[0].pageY
    }

    function startDrag(event){
        isDraggin = true
        startY = pageY(event)
        
    }

    function setAnimation(){
        $element.style.transition = 'margin-bottom: .3s'
    }

    function bounce(){
        if(widgetPosition < ELEMENT_BLOCK_SIZE / 2){
            return open()
        }
        return close()
    }

    function dragEnd(){
        isDraggin = false
        bounce()
    }
    
    

    function toggle(){
        if(isDraggin === false){

            if(!isOpen){
                return open()
            }
            return close()
        }
    }


    function logger(message){
        if(defaultConfig.debug){
            console.info(message)
        }
    }
    
    function open(){
       logger('Widget Abierto')
       isOpen = true
       widgetPosition = VISIBLE_Y_POSITION
       setWidgetPosition(widgetPosition)
    }

    function close(){
        logger('Widget Cerrado')
        isOpen = false
        widgetPosition = HIDDEN_Y_POSITION
       setWidgetPosition(widgetPosition)

    }
    
     function setWidgetPosition(value){
        $element.style.marginBottom = `-${value}px`
    
    }
    function drag(event){
        const cursorY = pageY(event)
        const movementY = cursorY - startY 
        widgetPosition = widgetPosition + movementY 
        startY = cursorY
        if(widgetPosition > HIDDEN_Y_POSITION){
            return false
        }
        setWidgetPosition(widgetPosition)
    }

}

