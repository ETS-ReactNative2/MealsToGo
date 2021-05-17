import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { clearCart } from '../slices/cartSlice';
import { makePay } from '../slices/checkoutSlice';

import Text from '../../../components/utils/Text';
import Spacer from '../../../components/utils/Spacer';
import SafeArea from '../../../components/utils/SafeArea';

import CreditCardInput from '../components/CreditCardInput';

import {
  CartIconContainer,
  CartIcon,
  NameInput,
  PayButton,
  ClearButton,
  PaymentProcessing,
} from '../components/checkoutStyles';
import RestaurantInfoCard from '../../restaurants/components/RestaurantInfoCard';

export default function CheckoutScreen({ navigation }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.checkout);
  const { items, restaurant, sum } = useSelector((state) => state.cart);
  const [ownerName, setOwnerName] = useState('');

  const handlePay = async () => {
    const resultAction = await dispatch(makePay(sum));
    if (makePay.fulfilled.match(resultAction)) {
      navigation.navigate('CheckoutSuccess');
      dispatch(clearCart());
    } else {
      navigation.navigate('CheckoutError', {
        error: 'Unable to complete the payment, please try again',
      });
    }
  };

  if (!items.length || !restaurant) {
    return (
      <SafeArea>
        <CartIconContainer>
          <CartIcon icon='cart-off' />
          <Text>Your cart is empty!</Text>
        </CartIconContainer>
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      {loading && <PaymentProcessing />}
      <ScrollView>
        <Spacer position='left' size='medium'>
          <Spacer position='top' size='large'>
            <Text>Your Order</Text>
          </Spacer>
          <List.Section>
            {items.map(({ name, price }, index) => {
              return (
                <List.Item key={`item-${index}`} title={`${name} - ${price}`} />
              );
            })}
          </List.Section>
          <Text>Total: {sum}</Text>
        </Spacer>
        <Spacer position='top' size='large' />
        <Divider />
        <NameInput
          label='Name'
          value={ownerName}
          onChangeText={(name) => {
            setOwnerName(name);
          }}
        />
        <Spacer position='top' size='large'>
          {ownerName.length > 0 && <CreditCardInput name={ownerName} />}
        </Spacer>
        <Spacer position='top' size='xxl' />
        <PayButton
          disabled={loading}
          icon='cash-usd'
          mode='contained'
          onPress={handlePay}
        >
          Pay
        </PayButton>
        <Spacer position='top' size='large'>
          <ClearButton
            disabled={loading}
            icon='cart-off'
            mode='contained'
            onPress={() => dispatch(clearCart())}
          >
            Clear Cart
          </ClearButton>
        </Spacer>
      </ScrollView>
    </SafeArea>
  );
}
