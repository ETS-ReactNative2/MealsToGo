import React from 'react';
import { useDispatch } from 'react-redux';
import { LiteCreditCardInput } from 'react-native-lite-credit-card-input';
import { fetchCardToken } from '../slices/checkoutSlice';
import Spacer from '../../../components/utils/Spacer';

export default function CreditCardInput({ name = 'Mo' }) {
  const dispatch = useDispatch();

  const onChange = async (data) => {
    const { values, valid } = data;
    // const isIncomplete = Object.values(status).includes('');
    const expiry = values.expiry.split('/');
    const card = {
      number: values.number,
      exp_month: expiry[0],
      exp_year: expiry[1],
      cvc: values.cvc,
      name: name,
    };
    if (valid) {
      // dispatch(fetchCardToken(card));
    }
  };

  return (
    <Spacer size='medium' position='left'>
      <LiteCreditCardInput onChange={onChange} />
    </Spacer>
  );
}
