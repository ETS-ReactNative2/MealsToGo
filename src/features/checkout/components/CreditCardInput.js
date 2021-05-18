import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LiteCreditCardInput } from 'react-native-lite-credit-card-input';
import { fetchCardToken } from '../slices/checkoutSlice';
import Spacer from '../../../components/utils/Spacer';
import { NameInput } from './checkoutStyles';

export default function CreditCardInput() {
  const dispatch = useDispatch();
  const [ownerName, setOwnerName] = useState('');
  const [isCardValid, setIsCardValid] = useState(false);
  const [card, setCard] = useState({
    name: null,
    number: null,
    exp_month: null,
    exp_year: null,
    cvc: null,
  });

  const handleCardChange = (data) => {
    const { values, valid } = data;
    const expiry = values.expiry.split('/');
    if (valid) {
      setCard({
        ...card,
        number: values.number,
        exp_month: expiry[0],
        exp_year: expiry[1],
        cvc: values.cvc,
      });
    }
    if (valid !== isCardValid) {
      setIsCardValid(valid);
    }
  };

  const handleNameChange = (name) => {
    setCard({ ...card, name });
    setOwnerName(name);
  };

  useEffect(() => {
    if (!Object.values(card).includes(null)) {
      dispatch(fetchCardToken(card));
    }
  }, [card, dispatch]);

  return (
    <>
      <NameInput
        label='Name'
        value={ownerName}
        onChangeText={handleNameChange}
      />
      <Spacer position='top' size='large'>
        <Spacer position='left' size='large'>
          <LiteCreditCardInput onChange={handleCardChange} />
        </Spacer>
      </Spacer>
    </>
  );
}
