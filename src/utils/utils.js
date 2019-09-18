export function changeNum (val) {
    return val
}
export function formatEnter (val) {
    let text = val
    text = text.replace(/\r\n/g, "<br>")
    text = text.replace(/\n/g,"<br>"); 
    return text
}

