// Collapsible Menu Implementation
var collapsibleMenu = document.getElementsByClassName("collapsible");
var i;

for(i = 0; i < collapsibleMenu.length; i++) {
    collapsibleMenu[i].addEventListener("click",function() {
        this.classList.toggle("collapsed");
        var content = this.nextElementSibling;
        if(content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}