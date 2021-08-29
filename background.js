var contextMenus  = {};
var search_message;
var sites = []

contextMenus.tds = chrome.contextMenus.create({
"title":"fetch-this",
"id":"111",
"contexts":["selection"]},function(){});


chrome.contextMenus.onClicked.addListener(handler);


function handler(info,tab){
    if(info.menuItemId==contextMenus.tds){
    search_message = info.selectionText;
    chrome.tabs.create({
        url: "https://towardsdatascience.com/search?q=".concat(search_message)
      });
    }
}


chrome.runtime.onMessage.addListener(function(message, sender) {
  if(!message.myPopupIsOpen) return;
sites.push(message.text)
});

