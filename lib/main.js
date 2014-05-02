var data = require("sdk/self").data;
var tabs = require("sdk/tabs");
var buttons = require("sdk/ui/button/toggle");

var button = buttons.ToggleButton({
    id: "hash0",
    label: "hash0",
    icon: {
        "16": "./icon.png"
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

    panel.port.on("password", function(code) {
        tabs.activeTab.attach({
            contentScript: code
        });
    });

    return panel;
}

var panel = getPanel();

function handleChange(state) {
    if (state.checked) {
        panel.show({
            position: {
                "top": 0,
                "left": 0
            }
        });
    }
}
