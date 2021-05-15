import React from 'react';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';

import Text from '../../../components/utils/Text';
import Spacer from '../../../components/utils/Spacer';
import SafeArea from '../../../components/utils/SafeArea';

import CreditCardInput from '../components/CreditCardInput';

import { CartIconContainer, CartIcon } from '../components/checkoutStyles';
import RestaurantInfoCard from '../../restaurants/components/RestaurantInfoCard';

export default function CheckoutScreen() {
  const { items, restaurant, sum } = useSelector((state) => state.cart);

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
      <ScrollView>
        <Spacer position='left' size='medium'>
          <Spacer position='top' size='large'>
            <Text>Your Order</Text>
          </Spacer>
          <List.Section>
            {items.map(({ name, price }, index) => {
              return (
                <List.Item key={index} title={`${name} - ${price / 100}`} />
              );
            })}
          </List.Section>
          <Text>Total: {sum / 100}</Text>
        </Spacer>
        <CreditCardInput />
      </ScrollView>
    </SafeArea>
  );
}
