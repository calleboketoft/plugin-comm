"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This is the API between the platform and the plugins
var pluginComm = {
    // Platform uses this method to register a callback to handle incoming
    // data from plugins
    platformRegisterDataCallback: function (cb) {
        this.platformCallback = cb;
    },
    // Platform use this method to send data to plugins
    platformSendDataToPlugin: function (pluginName, dataToPlugin) {
        this.pluginsCallbacks[pluginName](dataToPlugin);
    },
    // Plugins use this method to register their callback method for handling
    // incoming data from platform
    pluginRegisterDataCallback: function (pluginName, cb) {
        var uniqueId = pluginName + ':' + makeUUID();
        this.pluginsCallbacks[uniqueId] = cb;
        return uniqueId;
    },
    // Plugins use this method to send data to the platform
    pluginSendDataToPlatform: function (dataToPlatform) {
        this.platformCallback(dataToPlatform);
    },
    // Plugins use this method to unregister their callback method
    pluginUnregisterDataCallback: function (pluginName) {
        delete this.pluginsCallbacks[pluginName];
    },
    pluginsCallbacks: {},
    platformCallback: null
};
if (!window['pluginComm']) {
    window['pluginComm'] = pluginComm;
}
var pluginCommInstance = window['pluginComm'];
exports.pluginComm = pluginCommInstance;
// Generate UUID
// https://gist.github.com/jed/982883
var hex = [];
for (var i = 0; i < 256; i++) {
    hex[i] = (i < 16 ? '0' : '') + i.toString(16);
}
function makeUUID() {
    var r = crypto.getRandomValues(new Uint8Array(16));
    r[6] = (r[6] & 0x0f) | 0x40;
    r[8] = (r[8] & 0x3f) | 0x80;
    return (hex[r[0]] +
        hex[r[1]] +
        hex[r[2]] +
        hex[r[3]] +
        '-' +
        hex[r[4]] +
        hex[r[5]] +
        '-' +
        hex[r[6]] +
        hex[r[7]] +
        '-' +
        hex[r[8]] +
        hex[r[9]] +
        '-' +
        hex[r[10]] +
        hex[r[11]] +
        hex[r[12]] +
        hex[r[13]] +
        hex[r[14]] +
        hex[r[15]]);
}
//# sourceMappingURL=plugin-comm.js.map