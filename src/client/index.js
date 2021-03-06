import React from 'react';
import Preview from './preview/components/Preview';
import { stories } from './configure';
import { actions } from './configure';

// export configuration API functions
export { action } from './configure/';
export { addDecorator } from './configure/';
export { setAddon } from './configure/';
export { configure } from './configure/';
export { storiesOf } from './configure/';

// export API to override user configurations
// useful when building using CI servers
let configOverride = null;
export function configureUI(config) {
  configOverride = config;
}

// export the function to generate the preview component
export function getStorybookUI(_config) {
  let config = _config;

  // NOTE: for backward compatibility
  if (config.host || config.port) {
    config.channel = config.channel || {
      type: 'websocket',
      options: { address: `ws://${config.host}:${config.port}` },
    };
  }

  if (configOverride) {
    config = configOverride;
  }

  return () => <Preview config={config} stories={stories} actions={actions} />;
}

// for the backward compatibility
export const PreviewComponent = getStorybookUI;
export const StorybookUI = getStorybookUI;
