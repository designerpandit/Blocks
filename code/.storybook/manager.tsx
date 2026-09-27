import { startCase } from 'es-toolkit/string';
import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  sidebar: {
    renderAriaLabel: ({ name, type }) => `${type} ${name}`,
    renderLabel: ({ name, type }) => (type === 'story' ? name : startCase(name)),
  },
  theme: create({
    base: 'dark',
    brandTitle: 'Blocks',
    brandUrl: './',
    brandImage: './blocks-logo.svg',
    brandTarget: '_self',

    colorPrimary: '#FF385C',
    colorSecondary: '#FF385C',

    appBg: '#0A0A0A',
    appContentBg: '#141414',
    appPreviewBg: '#141414',
    appBorderColor: 'hsl(0 0% 100% / 0.1)',
    appBorderRadius: 6,

    textColor: '#F5F5F5',
    textInverseColor: '#0A0A0A',
    textMutedColor: '#A0A0A0',

    barBg: '#0A0A0A',
    barTextColor: '#A0A0A0',
    barHoverColor: '#FF385C',
    barSelectedColor: '#FF385C',

    buttonBg: '#141414',
    buttonBorder: 'hsl(0 0% 100% / 0.1)',
    booleanBg: '#141414',
    booleanSelectedBg: '#1F1F1F',

    inputBg: '#141414',
    inputBorder: 'hsl(0 0% 100% / 0.1)',
    inputTextColor: '#F5F5F5',
    inputBorderRadius: 6,
  }),
});

import '../core/src/shared/open-service/sync-test/manager.tsx';
