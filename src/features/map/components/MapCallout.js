import React from 'react';

import CompactRestaurantInfo from '../../../components/CompactRestaurantInfo/CompactRestaurantInfo';

export default function MapCallout({ restaurant }) {
  return <CompactRestaurantInfo restaurant={restaurant} isMap />;
}
