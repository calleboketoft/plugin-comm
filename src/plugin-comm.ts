// Library to communicate between platform and plugins

const pluginComm = {
  // The platform data callback function is registered here. When a plugin
  // sends a message to the platform, the function registered here will be
  // invoked
  platformCallback: null,

  // Platform use this method to register it's data callback function
  platformRegisterDataCallback(cb) {
    this.platformCallback = cb;
  },

  // Platform use this method to send data to plugins
  platformSendDataToPlugin(pluginId, dataToPlugin) {
    this.pluginsCallbacks[pluginId](dataToPlugin);
  },

  // Each plugin data callback is registered on this object like this:
  // {
  //    [pluginId]: pluginInstanceCallbackFunction()
  // }
  pluginsCallbacks: {},

  // Plugins use this method to register their callback method for handling
  // incoming data from platform
  pluginRegisterDataCallback(pluginId, cb) {
    this.pluginsCallbacks[pluginId] = cb;
  },

  // Plugins use this method to send data to the platform
  pluginSendDataToPlatform(dataToPlatform) {
    this.platformCallback(dataToPlatform);
  },

  // Plugins use this method to unregister their callback function. This is
  // typically done when removing a plugin from the platform DOM
  pluginUnregisterDataCallback(pluginId) {
    delete this.pluginsCallbacks[pluginId];
  },

  // Convenience method for the platform to use when generating an unique id for
  // each plugin instance. Example 'plugin-name-here:generated-uuid-here'
  makeUUID: makeUUID,

  // The plugin manifest with information about each plugin is registered here
  pluginsManifest: null
};

// Register the pluginComm library on window for global access
if (!window['pluginComm']) {
  window['pluginComm'] = pluginComm;
}

const pluginCommInstance = window['pluginComm'];
export { pluginCommInstance as pluginComm };

// Generate UUID https://gist.github.com/jed/982883
function makeUUID(a?) {
  return a
    ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
    : ('' + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, makeUUID);
}
