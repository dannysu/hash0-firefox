var data = require("sdk/self").data;
var tabs = require("sdk/tabs");
var buttons = require("sdk/ui/button/toggle");

var button = buttons.ToggleButton({
    id: "hash0",
    label: "hash0",
    icon: {
        "32": "./hash0/icons/icon32x32.png",
        "48": "./hash0/icons/icon48x48.png",
        "64": "./hash0/icons/icon64x64.png"
    },
    onChange: handleChange
});

function getPanel() {
    var panel = require("sdk/panel").Panel({
        width: 480,
        height: 335,
        contentURL: data.url("hash0/app/index.html"),
        onShow: function() {
            panel.port.emit("dispatch");
        },
        onHide: function() {
            panel.port.emit("wipe");
            button.state('window', {checked:false});
        }
    });

    panel.port.on("init", function() {
        panel.port.emit("url", tabs.activeTab.url);
    });

    panel.port.on("login", function(login) {
        var worker = tabs.activeTab.attach({
            contentScriptFile: data.url('hash0/app/login_helper.js')
        });
        worker.port.emit("username", login.username);
        worker.port.emit("password", login.password);
    });

    return panel;
}

var panel = getPanel();

function handleChange(state) {
    if (state.checked) {
        panel.show({
            position: button
        });
    }
}
