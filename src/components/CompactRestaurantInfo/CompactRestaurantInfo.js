import React from 'react';
// import styled from 'styled-components/native';
// import WebView from 'react-native-webview';
import { Platform } from 'react-native';
import {
  CompactImage,
  CompactWebview,
  Item,
} from './CompactRestaurantInfoStyles';
import Text from '../utils/Text';

const isAndroid = Platform.OS === 'android';

export default function CompactRestaurantInfo({ restaurant, isMap }) {
  const Image = isAndroid && isMap ? CompactWebview : CompactImage;

  return (
    <Item>
      <Image source={{ uri: restaurant.photos[0] }} />
      <Text center variant='caption' numberOfLines={3}>
        {restaurant.name}
      </Text>
    </Item>
  );
}
