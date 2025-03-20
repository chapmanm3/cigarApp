import React, { useContext } from 'react';
import {
  FlatList,
} from 'react-native';
// Import either cigarListStyles or cigarGridStyles depending on the selected layout
import { CigarListItem } from './cigarListItem';
import { UserCigar, UsersCigars } from '@/api/cigarsQueries';
import { UserHumidor, UsersHumidors } from '@/api/humidorQueries';
import { HumidorListItem } from './HumidorListItem';

// Assuming you have a ThemeContext
// import { ThemeContext } from './ThemeContext';

interface Props {
  humidors: UsersHumidors;
}

export const HumidorsList: React.FC<Props> = ({ humidors }) => {
  // const { theme } = useContext(ThemeContext); // Get the current theme

  const onPressHumidor = (item: UserHumidor) => {
    console.log("Cigar Pressed")
  }

  return (
    <FlatList
      data={humidors}
      renderItem={({ item }) => <HumidorListItem item={item} onPressItem={onPressHumidor} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};
