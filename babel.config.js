module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'babel-plugin-styled-components',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@anibox': './src',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
