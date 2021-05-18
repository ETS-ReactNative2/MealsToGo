import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Text from '../../../components/utils/Text';
import SafeArea from '../../../components/utils/SafeArea';
import { colors } from '../../../infrastructure/theme/colors';
import { CartIconContainer, CartIcon } from '../components/checkoutStyles';
import { CommonActions } from '@react-navigation/native';

export default function CheckoutErrorScreen({ route, navigation }) {
  const { error = '' } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.addListener('blur', (e) => {
      navigation.dispatch((state) => {
        const routes = state.routes.filter((r) => r.name !== 'CheckoutError');
        return CommonActions.reset({
          ...state,
          routes,
          index: routes.length - 1,
        });
      });
    });
  }, [dispatch, navigation]);

  return (
    <SafeArea>
      <CartIconContainer>
        <CartIcon icon='close' bg={colors.ui.error} />
        <Text variant='body'>{error}</Text>
      </CartIconContainer>
    </SafeArea>
  );
}
