import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { getStylesForProperty } from 'css-to-react-native';

export const RestaurantList = styled(FlatList).attrs((props) => ({
  contentContainerStyle: getStylesForProperty('padding', props.theme.space[3]),
}))``;
