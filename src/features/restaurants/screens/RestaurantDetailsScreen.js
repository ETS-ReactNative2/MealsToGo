import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ScrollView } from 'react-native';
import { addToCart } from '../../checkout/slices/cartSlice';
import { List } from 'react-native-paper';

import RestaurantInfoCard from '../components/RestaurantInfoCard';
import { OrderButton } from '../components/RestaurantListStyles';
import SafeArea from '../../../components/utils/SafeArea';
import Spacer from '../../../components/utils/Spacer';

export default function RestaurantDetailsScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const [breakfastExpanded, setBreakfastExpanded] = useState(false);
  const [lunchExpanded, setLunchExpanded] = useState(false);
  const [dinnerExpanded, setDinnerExpanded] = useState(false);
  const [drinksExpanded, setDrinksExpanded] = useState(false);
  const { restaurant } = route.params;
  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      <ScrollView>
        <List.Accordion
          title='Breakfast'
          left={(props) => <List.Icon {...props} icon='bread-slice' />}
          expanded={breakfastExpanded}
          onPress={() => setBreakfastExpanded(!breakfastExpanded)}
        >
          <List.Item title='Eggs Benedict' />
          <List.Item title='Classic Breakfast' />
        </List.Accordion>

        <List.Accordion
          title='Lunch'
          left={(props) => <List.Icon {...props} icon='hamburger' />}
          expanded={lunchExpanded}
          onPress={() => setLunchExpanded(!lunchExpanded)}
        >
          <List.Item title='Burger w/ Fries' />
          <List.Item title='Steak Sandwich' />
          <List.Item title='Mushroom Soup' />
        </List.Accordion>

        <List.Accordion
          title='Dinner'
          left={(props) => <List.Icon {...props} icon='food-variant' />}
          expanded={dinnerExpanded}
          onPress={() => setDinnerExpanded(!dinnerExpanded)}
        >
          <List.Item title='Spaghetti Bolognese' />
          <List.Item title='Veal Cutlet with Chicken Mushroom Rotini' />
          <List.Item title='Steak Frites' />
        </List.Accordion>

        <List.Accordion
          title='Drinks'
          left={(props) => <List.Icon {...props} icon='cup' />}
          expanded={drinksExpanded}
          onPress={() => setDrinksExpanded(!drinksExpanded)}
        >
          <List.Item title='Coffee' />
          <List.Item title='Tea' />
          <List.Item title='Modelo' />
          <List.Item title='Coke' />
          <List.Item title='Fanta' />
        </List.Accordion>
      </ScrollView>
      <Spacer position='bottom' size='large'>
        <OrderButton
          icon='cash-usd'
          mode='contained'
          onPress={() => {
            dispatch(
              addToCart({ item: { name: 'special', price: 12.99 }, restaurant })
            );
            navigation.navigate('Checkout');
          }}
        >
          Order Special Only 12.99!
        </OrderButton>
      </Spacer>
    </SafeArea>
  );
}
