import React from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/infrastructure/theme';
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from '@expo-google-fonts/oswald';
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato';
import { Provider } from 'react-redux';
import Navigation from './src/infrastructure/navigation/Navigation';
import store from './src/infrastructure/store';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(
  'QKfadz940jcOwmeBAa35HqFZcaRM02HG4BkTnv7L',
  'ioNNVmyFqnCeptnGh1PxhGUvvi99A0mx3YcO0F25'
);
// Parse.serverURL = 'http://192.168.1.19:1337/parse';
Parse.serverURL = 'https://parseapi.back4app.com/';

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </ThemeProvider>
      <ExpoStatusBar style='auto' />
    </>
  );
}
