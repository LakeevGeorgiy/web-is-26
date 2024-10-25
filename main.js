var before_loadtime = new Date().getTime();
window.onload = () => {
    var after_loadtime = new Date().getTime();
    load_time = (after_loadtime - before_loadtime) / 1000
    setActive()
    document.getElementsByClassName("footer__load-time")[0].innerHTML = "Page load time: " + load_time
};

function setActive() {
    items = document.getElementsByClassName("menu-list__item")
    for (i = 0; i < items.length; i++) {
        link = items[i].getElementsByClassName("menu-list__link")[0]
        
        if (document.location.href.indexOf(link.href) >= 0) {
            items[i].style.background = '#014a70'
        }
    }
}