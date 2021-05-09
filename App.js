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
import store from './src/redux/store';
import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDCTxnrBtX_LQ_BUq9zADPJuhjSUpjPyU4',
  authDomain: 'mealstogo-2244b.firebaseapp.com',
  projectId: 'mealstogo-2244b',
  storageBucket: 'mealstogo-2244b.appspot.com',
  messagingSenderId: '880371162913',
  appId: '1:880371162913:web:937e7d4951173a44bc6860',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

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
