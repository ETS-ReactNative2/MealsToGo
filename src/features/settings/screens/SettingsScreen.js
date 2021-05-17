import React from 'react';
// import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { clearLocation } from '../../../slices/location/locationSlice';
import { logout } from '../../account/slices/userSlice';
import {
  saveFavorites,
  clearFavorites,
} from '../../../components/Favorites/favoritesSlice';
import {
  saveCart,
  clearCart,
} from '../../../features/checkout/slices/cartSlice';
import { colors } from '../../../infrastructure/theme/colors';
import { List, Avatar } from 'react-native-paper';
import Text from '../../../components/utils/Text';
import Spacer from '../../../components/utils/Spacer';
import {
  SettingsItem,
  AvatarContainer,
  TransparentSafeArea,
  SettingsBackground,
} from '../components/SettingScreen';

export default function SettingsScreen({ navigation }) {
  const dispatch = useDispatch();
  const { info, photo } = useSelector((state) => state.user);

  const handleLogout = async () => {
    await dispatch(saveCart());
    dispatch(clearCart());
    await dispatch(saveFavorites());
    await dispatch(logout());
    dispatch(clearFavorites());
    dispatch(clearLocation());
  };

  return (
    <SettingsBackground>
      <TransparentSafeArea>
        <AvatarContainer>
          <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
            {photo ? (
              <Avatar.Image
                size={180}
                source={{ uri: photo }}
                backgroundColor='#2182BD'
              />
            ) : (
              <Avatar.Icon
                size={180}
                icon='human'
                backgroundColor={colors.brand.primary}
              />
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
            left={(props) => (
              <List.Icon {...props} color={colors.ui.error} icon='heart' />
            )}
            onPress={() => navigation.navigate('Favorites')}
          />
          <Spacer />
          <SettingsItem
            title='Payment'
            left={(props) => (
              <List.Icon {...props} color={colors.ui.secondary} icon='cart' />
            )}
            onPress={() => null}
          />
          <Spacer />
          <SettingsItem
            title='Past Orders'
            left={(props) => (
              <List.Icon
                {...props}
                color={colors.ui.secondary}
                icon='history'
              />
            )}
            onPress={() => null}
          />
          <Spacer />
          <SettingsItem
            title='Logout'
            left={(props) => (
              <List.Icon {...props} color={colors.ui.secondary} icon='door' />
            )}
            onPress={handleLogout}
          />
        </List.Section>
      </TransparentSafeArea>
    </SettingsBackground>
  );
}
