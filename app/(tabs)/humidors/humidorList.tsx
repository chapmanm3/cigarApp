import React, { useContext } from 'react';
import {
  FlatList, RefreshControl, Text,
} from 'react-native';
// Import either cigarListStyles or cigarGridStyles depending on the selected layout
import { CigarListItem } from './cigarListItem';
import { UserCigar, UsersCigars } from '@/api/cigarsQueries';
import { UserHumidor, UsersHumidors } from '@/api/humidorQueries';
import { HumidorListItem } from './HumidorListItem';
import { router } from 'expo-router';

// Assuming you have a ThemeContext
// import { ThemeContext } from './ThemeContext';

interface Props {
  humidors: UsersHumidors;
  fetchFunction: () => void;
  loading: boolean
}

export const HumidorsList: React.FC<Props> = ({ humidors, fetchFunction, loading }) => {
  // const { theme } = useContext(ThemeContext); // Get the current theme

  const onPressHumidor = (item: UserHumidor) => {
    const stringItem = JSON.stringify(item)
    router.push({
      pathname: '/humidors/humidorDetails',
      params: {humidorString: stringItem}
    })
  }

  return (
    <FlatList
      data={humidors}
      renderItem={({ item }) => <HumidorListItem item={item} onPressItem={onPressHumidor} />}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={<Text>No Humidors</Text>}
      refreshControl={<RefreshControl onRefresh={fetchFunction} refreshing={loading} />}
    />
  );
};
