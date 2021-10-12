var new_site = document.getElementById('site');
var add_button = document.getElementById('add');

//refresh the extention
chrome.runtime.requestUpdateCheck(function(){});

chrome.runtime.onMessage.addListener(handler);

//send to background the added site
add_button.addEventListener('click',add_pressed);


function add_pressed(){
    if(new_site.value!=""){
    window.location.reload(true);
    chrome.runtime.sendMessage({"id":"add","site":new_site.value});
    send_request();
    }
}

//receive saved sites
send_request();
function send_request(){
    chrome.runtime.sendMessage({"id":"request_sites"});
}

function handler(messge){
    //receive saved sites
    if(messge.id=="saved_sites"){
        sites = messge.data;
        update_popup(sites);
    } 
}



//update popup
function update_popup(sites){
    for(const i of sites){
        new_ele(i);
    }
}


//creating element
function new_ele(site){
    let div = document.createElement('div'); 
    let button = document.createElement('button');
    div.textContent = site;
    div.className = "aligned2";
    button.innerHTML = "-";
    //send message to background to remove site
    button.addEventListener("click",function(){
    chrome.runtime.sendMessage({'id':"remove","site":site});
    div.remove();
    button.remove()
    });

    document.body.appendChild(div);
    div.appendChild(button);
}



