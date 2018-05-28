"use strict";
// This is the API between the platform and the plugins
Object.defineProperty(exports, "__esModule", { value: true });
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
        this.pluginsCallbacks[pluginName] = cb;
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
//# sourceMappingURL=plugin-comm.js.map