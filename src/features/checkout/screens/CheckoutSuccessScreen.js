import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Text from '../../../components/utils/Text';
import SafeArea from '../../../components/utils/SafeArea';
import { CartIconContainer, CartIcon } from '../components/checkoutStyles';
import { clearSuccess } from '../slices/checkoutSlice';
import { CommonActions } from '@react-navigation/native';
import { clearCart } from '../slices/cartSlice';

export default function CheckoutSuccessScreen({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.addListener('blur', (e) => {
      dispatch(clearSuccess());
      navigation.dispatch((state) => {
        const routes = state.routes.filter((r) => r.name !== 'CheckoutError');
        return CommonActions.reset({
          ...state,
          routes,
          index: routes.length - 1,
        });
      });
    });
    dispatch(clearCart());
  }, [dispatch, navigation]);

  return (
    <SafeArea>
      <CartIconContainer>
        <CartIcon icon='check-bold' />
        <Text variant='label'>Success!</Text>
      </CartIconContainer>
    </SafeArea>
  );
}
