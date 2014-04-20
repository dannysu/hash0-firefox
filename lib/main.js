var data = require("sdk/self").data;
var tabs = require("sdk/tabs");

function getPanel() {
    var panel = require("sdk/panel").Panel({
        width: 480,
        height: 335,
        contentURL: data.url("hash0/app/index.html"),
        onHide: function() {
            panel.port.emit("hide");
        }
    });

    panel.port.on("init", function() {
        panel.port.emit("url", tabs.activeTab.url);
    });

    panel.port.on("password", function(code) {
        tabs.activeTab.attach({
            contentScript: code
        });
    });

    return panel;
}

var panel = getPanel();

require('toolbarwidget').ToolbarWidget({
    toolbarID: 'nav-bar',
    id: 'hash0',
    label: 'hash0',
    contentURL: data.url('icon.png'),
    panel: panel
});

