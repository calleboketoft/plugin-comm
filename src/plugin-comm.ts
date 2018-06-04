// This is the API between the platform and the plugins
const pluginComm = {
  // Platform use this method to register a callback to handle incoming
  // data from plugins
  platformRegisterDataCallback(cb) {
    this.platformCallback = cb;
  },

  // Platform use this method to send data to plugins
  platformSendDataToPlugin(pluginId, dataToPlugin) {
    this.pluginsCallbacks[pluginId](dataToPlugin);
  },

  // Plugins use this method to register their callback method for handling
  // incoming data from platform
  pluginRegisterDataCallback(pluginName, cb) {
    const uniqueId = pluginName + ':' + makeUUID();
    this.pluginsCallbacks[uniqueId] = cb;
    this.pluginSendDataToPlatform({
      type: '[plugin-registered]',
      payload: { pluginId: uniqueId }
    });
    return uniqueId;
  },

  // Plugins use this method to send data to the platform
  pluginSendDataToPlatform(dataToPlatform) {
    this.platformCallback(dataToPlatform);
  },

  // Plugins use this method to unregister their callback method
  pluginUnregisterDataCallback(pluginName) {
    delete this.pluginsCallbacks[pluginName];
  },

  makeUUID: makeUUID,

  pluginsCallbacks: {},

  platformCallback: null
};

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
