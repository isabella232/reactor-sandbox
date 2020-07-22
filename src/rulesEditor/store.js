import { init } from '@rematch/core';
import registry from './models/registry';
import currentIframe from './models/currentIframe';
import currentRule from './models/currentRule';
import rules from './models/rules';
import dataElements from './models/dataElements';
import propertySettings from './models/propertySettings';
import otherSettings from './models/otherSettings';
import extensionConfigurations from './models/extensionConfigurations';
// eslint-disable-next-line import/no-cycle
import brain from './models/brain';
import modals from './models/modals';

const store = init({
  models: {
    brain,
    rules,
    dataElements,
    extensionConfigurations,
    registry,
    currentIframe,
    currentRule,
    propertySettings,
    otherSettings,
    modals
  }
});

export default store;
export const { dispatch } = store;
