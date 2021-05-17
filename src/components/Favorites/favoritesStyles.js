import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Card } from 'react-native-paper';

export const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 9;
`;

export const FavoritesWrapper = styled(Card)`
  padding: 10px;
  z-index: 999;
  border-radius: 15px;
`;
