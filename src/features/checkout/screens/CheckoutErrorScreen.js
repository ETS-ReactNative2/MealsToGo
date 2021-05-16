import React from 'react';

import Text from '../../../components/utils/Text';
import SafeArea from '../../../components/utils/SafeArea';
import { colors } from '../../../infrastructure/theme/colors';
import { CartIconContainer, CartIcon } from '../components/checkoutStyles';

export default function CheckoutErrorScreen({ route }) {
  const { error = '' } = route.params;
  return (
    <SafeArea>
      <CartIconContainer>
        <CartIcon icon='close' bg={colors.ui.error} />
        <Text variant='label'>{error}</Text>
      </CartIconContainer>
    </SafeArea>
  );
}
