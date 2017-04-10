// chrome.browserAction.onClicked.addListener(function (tab) {
// 	chrome.tabs.executeScript(tab.ib, {file: "popup.js"});
// });


chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.executeScript(tab.ib, {file: "jquery-3.2.0.min.js"}, function(){
            chrome.tabs.executeScript(tab.ib, {file: "popup.js"});
        });
});

