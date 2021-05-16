import React from 'react';

import Text from '../../../components/utils/Text';
import SafeArea from '../../../components/utils/SafeArea';
import { CartIconContainer, CartIcon } from '../components/checkoutStyles';

export default function CheckoutSuccessScreen() {
  return (
    <SafeArea>
      <CartIconContainer>
        <CartIcon icon='check-bold' />
        <Text variant='label'>Success!</Text>
      </CartIconContainer>
    </SafeArea>
  );
}
