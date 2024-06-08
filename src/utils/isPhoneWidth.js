export function isPhoneWidth(w = 1300) {
    const _width = document.body.clientWidth;
    let isPh = false;
    if(_width >= parseInt(w)) {
        isPh = false;
    }else if(_width <= parseInt(w)) {
        isPh = true;
    }
    return isPh
}
export function getParseate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('00'+(date.getMonth()+1)).slice(-2);
    const day = ('00'+date.getDate()).slice(-2);
    return `${year}-${month}-${day}`
}