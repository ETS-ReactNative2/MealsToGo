import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../slices/userSlice';
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
} from '../components/accountStyles';
import Text from '../../../components/utils/Text';
import Spacer from '../../../components/utils/Spacer';
import { ActivityIndicator, Colors } from 'react-native-paper';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.user);

  return (
    <AccountBackground>
      <AccountCover />
      <Title>Meals To Go</Title>
      <AccountContainer>
        <AuthInput
          label='E-mail'
          value={email}
          textContentType='emailAddress'
          keyboardType='email-address'
          autoCapitalize='none'
          onChangeText={(u) => setEmail(u)}
        />
        <Spacer size='large'>
          <AuthInput
            label='Password'
            value={password}
            textContentType='password'
            secureTextEntry
            autoCapitalize='none'
            onChangeText={(p) => setPassword(p)}
          />
        </Spacer>
        <Spacer size='large'>
          <AuthInput
            label='Repeat Password'
            value={repeatedPassword}
            textContentType='password'
            secureTextEntry
            autoCapitalize='none'
            onChangeText={(p) => setRepeatedPassword(p)}
          />
        </Spacer>
        {error && (
          <ErrorContainer size='large'>
            <Text variant='error'>{error}</Text>
          </ErrorContainer>
        )}
        <Spacer size='large'>
          {!loading ? (
            <AuthButton
              icon='email'
              mode='contained'
              onPress={() =>
                dispatch(register({ email, password, repeatedPassword }))
              }
            >
              Register
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
      </AccountContainer>
      <Spacer size='large'>
        <AuthButton mode='contained' onPress={() => navigation.goBack()}>
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
}
