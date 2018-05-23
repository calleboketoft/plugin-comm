"use strict";
// This is the API between the platform and the plugins
Object.defineProperty(exports, "__esModule", { value: true });
var pluginComm = {
    // Plugins use this method to send data to the platform
    sendDataToPlatform: function (dataToPlatform) {
        this.platformCallback(dataToPlatform);
    },
    // Platform use this method to send data to plugins
    sendDataToPlugin: function (pluginName, dataToPlugin) {
        this.pluginsCallbacks[pluginName](dataToPlugin);
    },
    // Plugins use this method to register their callback method for handling
    // incoming data from platform
    registerPluginDataCallback: function (pluginName, cb) {
        this.pluginsCallbacks[pluginName] = cb;
    },
    // Platform uses this method to register a callback to handle incoming
    // data from plugins
    registerPlatformDataCallback: function (cb) {
        this.platformCallback = cb;
    },
    pluginsCallbacks: {},
    platformCallback: null
};
if (!window['pluginComm']) {
    window['pluginComm'] = pluginComm;
}
var pluginCommInstance = window['pluginComm'];
exports.pluginComm = pluginCommInstance;
//# sourceMappingURL=plugin-comm.js.map