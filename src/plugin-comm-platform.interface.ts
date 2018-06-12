// lib with functions that the platform can implement
// plugins will use this interface to make calls to the platform

export interface PluginCommPlatform {
  platformType: string;

  alertMessage?(message: string): void;

  logMessage?(message: string): string;

  makeGetRequest?(url: string): Promise<any>;

  makePostRequest?(url: string, body: string): Promise<any>;

  registerPlugin(pluginId: string): string;
}
