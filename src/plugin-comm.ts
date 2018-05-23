// This is the API between the platform and the plugins

const pluginComm = {
  // Plugins use this method to send data to the platform
  sendDataToPlatform: function(dataToPlatform) {
    this.platformCallback(dataToPlatform);
  },

  // Platform use this method to send data to plugins
  sendDataToPlugin: function(pluginName, dataToPlugin) {
    this.pluginsCallbacks[pluginName](dataToPlugin);
  },

  // Plugins use this method to register their callback method for handling
  // incoming data from platform
  registerPluginDataCallback(pluginName, cb) {
    this.pluginsCallbacks[pluginName] = cb;
  },

  // Platform uses this method to register a callback to handle incoming
  // data from plugins
  registerPlatformDataCallback(cb) {
    this.platformCallback = cb;
  },

  pluginsCallbacks: {},

  platformCallback: null
};

if (!window['pluginComm']) {
  window['pluginComm'] = pluginComm;
}

const pluginCommInstance = window['pluginComm'];
export { pluginCommInstance as pluginComm };
