const path = require('path')

module.exports = {
  packagerConfig: {
    icon: './src/public/icon.ico' // no file extension required
  },

  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'latheolivier',
          name: 'tchat-bewellCorporation',
        },
        prerelease: false,
        draft: true,
      },
    },
  ],

  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],

};
