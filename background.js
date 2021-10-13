var contextMenus = {};
var search_message;

chrome.storage.sync.get("sites",function(data){
    sites = data.sites;
});

chrome.runtime.onMessage.addListener(handler);
chrome.contextMenus.onClicked.addListener()

function handler(message){
//update contextmenu
create(sites);
//recive the added site
if(message.id=='add'){
add_site(message.site);
}

//send selected sites to popup
if(message.id=="request_sites"){
send_sites(sites);
}

//remove
if(message.id=="remove"){
sites.splice(sites.indexOf(message.site),1);
chrome.contextMenus.remove(message.site);
delete contextMenus[message.site];
//saving data
chrome.storage.sync.set({"sites":sites});
}
};


function add_site(site){
if(!sites.includes(site)){
sites.push(site);
create(sites);
//saving data
chrome.storage.sync.set({"sites":sites});
}
}

function send_sites(){
    chrome.runtime.sendMessage({"id":"saved_sites","data":sites});
}

//creating context menue item
function create(sites){
for(const element of sites){
    //matching site name
    var regex = /(?<=\/\/)(.*?)(?=\/)/;
    res = regex.exec(element);
    if(res == null){
    title = element;
    }else{
    title = res[0];
    }
    //creating context menue item
    contextMenus[element] = chrome.contextMenus.create({
      "title": title,
      "id": element,
      "contexts": ["selection"]
    }, function () {});
}}

//searching
chrome.contextMenus.onClicked.addListener(search);
function search(info,tab){
    create(sites);
    send_sites();
        for (const element of sites) {
        if (info.menuItemId == contextMenus[element]){
          search_message = info.selectionText;
          //refresh
          chrome.runtime.onStartup.addListener(function(){});
          chrome.tabs.create({
            url: element.concat(search_message)
          });
        }
      }}
      
