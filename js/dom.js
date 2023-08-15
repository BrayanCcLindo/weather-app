export function  createDOM(string){
    const parser = new DOMParser()
    const HTML = parser.parseFromString(string, "text/html")
    return HTML.body.firstChild
    

}


export function  footerDOM(string){
    const parser = new DOMParser()
    const footerHTML = parser.parseFromString(string, "text/html")
    return footerHTML.body.firstChild
    
    
    
}
