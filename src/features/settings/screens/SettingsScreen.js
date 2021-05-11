import React from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { logout } from '../../account/slices/userSlice';
import { saveFavorites } from '../../../components/Favorites/favoritesSlice';
import { List, Avatar } from 'react-native-paper';
import Text from '../../../components/utils/Text';
import Spacer from '../../../components/utils/Spacer';
import SafeArea from '../../../components/utils/SafeArea';

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;
const AvatarContainer = styled.View`
  align-items: center;
`;

export default function SettingsScreen({ navigation }) {
  const dispatch = useDispatch();
  const { info, photo } = useSelector((state) => state.user);
  return (
    <SafeArea>
      <AvatarContainer>
        <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
          {photo ? (
            <Avatar.Image
              size={180}
              source={{ uri: photo }}
              backgroundColor='#2182BD'
            />
          ) : (
            <Avatar.Icon size={180} icon='human' backgroundColor='#2182BD' />
          )}
        </TouchableOpacity>
        <Spacer position='top' size='large'>
          <Text variant='label'>{info ? info.email : ''}</Text>
        </Spacer>
      </AvatarContainer>

      <List.Section>
        <SettingsItem
          title='Favorites'
          description='View your favorites'
          left={(props) => <List.Icon {...props} color='black' icon='heart' />}
          onPress={() => navigation.navigate('Favorites')}
        />
        <SettingsItem
          title='Logout'
          left={(props) => <List.Icon {...props} color='black' icon='door' />}
          onPress={() => {
            dispatch(saveFavorites());
            dispatch(logout());
          }}
        />
      </List.Section>
    </SafeArea>
  );
}
