var data = require("sdk/self").data;
var ss = require("sdk/simple-storage");

var panel = require("sdk/panel").Panel({
    width: 480,
    height: 400,
    contentURL: data.url("hash0/index.html")
});

var toolbar = require('toolbarbutton').ToolbarButton({
    id: 'hash0',
    label: 'hash0',
    tooltiptext: 'Open hash0',
    image: data.url('icon.png'),
    panel: panel
});

panel.on("show", function() {
    panel.port.emit("show");
});
