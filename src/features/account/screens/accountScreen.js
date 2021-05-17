import React from 'react';
import LottieView from 'lottie-react-native';
import Spacer from '../../../components/utils/Spacer';
import {
  AccountBackground,
  MenuContainer,
  AccountCover,
  AuthButton,
  Title,
  AnimationWrapper,
} from '../components/accountStyles';

export default function AccountScreen({ navigation }) {
  return (
    <AccountBackground>
      <AccountCover />
      <AnimationWrapper>
        <LottieView
          key='animation'
          autoPlay
          loop
          resizeMode='cover'
          source={require('../../../../assets/watermelon.json')}
        />
      </AnimationWrapper>
      <Title>Meals To Go</Title>
      <MenuContainer>
        <AuthButton
          icon='lock-open-outline'
          mode='contained'
          onPress={() => navigation.navigate('Login')}
        >
          Login
        </AuthButton>
        <Spacer size='large'>
          <AuthButton
            icon='email'
            mode='contained'
            onPress={() => navigation.navigate('Register')}
          >
            Register
          </AuthButton>
        </Spacer>
      </MenuContainer>
    </AccountBackground>
  );
}
