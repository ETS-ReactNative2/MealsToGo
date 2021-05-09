import React from 'react';
import { View } from 'react-native';

import Favorite from '../../../components/Favorites/Favorite';
import { SvgXml } from 'react-native-svg';
import Spacer from '../../../components/utils/Spacer';
import Text from '../../../components/utils/Text';
import star from '../../../../assets/star';
import open from '../../../../assets/open';
import {
  RestaurantCard,
  RestaurantCardCover,
  Info,
  Rating,
  Icon,
  Address,
} from './RestaurantInfoCardStyles';

export default function RestaurantInfoCard({ restaurant = {} }) {
  const {
    name = 'Some Restaurant',
    icon = 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png',
    photos = [
      'https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg',
    ],
    address = '100 some random street',
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily = true,
    placeId,
  } = restaurant;

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <RestaurantCard elevation={5}>
      <View>
        <Favorite restaurant={restaurant} />
        <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      </View>
      <Info>
        <Text variant='label'>{name}</Text>
        <Rating>
          {ratingArray.map((elem, i) => (
            <SvgXml
              key={`star-${placeId}-${i}`}
              xml={star}
              width={20}
              height={20}
            />
          ))}
          <Spacer position='left' size='auto'>
            {isClosedTemporarily && (
              <Text variant='error'>CLOSED TEMPORARILY</Text>
            )}
          </Spacer>
          <Spacer position='left' size='large'>
            <SvgXml xml={open} width={20} height={20} />
          </Spacer>
          <Spacer position='left' size='large'>
            <Icon source={{ uri: icon }} />
          </Spacer>
        </Rating>
        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  );
}
