var data = require("sdk/self").data;
var tabs = require("sdk/tabs");

var panel = require("sdk/panel").Panel({
    width: 480,
    height: 335,
    contentURL: data.url("hash0/index.html"),
    onHide: function() {
        panel.port.emit("hide");
    }
});

var toolbar = require('toolbarbutton').ToolbarButton({
    id: 'hash0',
    label: 'hash0',
    tooltiptext: 'Open hash0',
    image: data.url('icon.png'),
    panel: panel
});

panel.on("show", function() {
    panel.port.emit("show", tabs.activeTab.url);
});

panel.port.on("password", function(code) {
    tabs.activeTab.attach({
        contentScript: code
    });
});
