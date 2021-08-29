
const new_site = document.getElementById("site")
const button = document.getElementById("add_button")

button.addEventListener("click", my_fun);

function my_fun(){
    if(new_site.value!=""){
    chrome.runtime.sendMessage({'myPopupIsOpen': true,
    "text":new_site.value});
    new_ele(new_site.value)
    new_site.value = "";
    }
}


function new_ele(site){
    let div = document.createElement('div');  //creating element
    div.textContent = site;         //adding text on the element
    document.body.appendChild(div);
}