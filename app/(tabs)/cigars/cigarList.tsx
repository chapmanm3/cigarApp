import React from 'react';
import {
  FlatList, RefreshControl, Text,
} from 'react-native';
// Import either cigarListStyles or cigarGridStyles depending on the selected layout
import { CigarListItem } from './cigarListItem';
import { UserCigar, UsersCigars } from '@/api/cigarsQueries';
import { router } from 'expo-router';

// Assuming you have a ThemeContext
// import { ThemeContext } from './ThemeContext';

interface CigarListProps {
  cigars: UsersCigars;
  fetchFunction: () => void
  loading: boolean
}

const CigarList: React.FC<CigarListProps> = ({
  cigars,
  fetchFunction,
  loading
}) => {
  // const { theme } = useContext(ThemeContext); // Get the current theme

  const onPressCigar = (item: UserCigar) => {
    const stringItem = JSON.stringify(item)
    router.push({
      pathname: '/cigars/cigarDetails',
      params: { cigarString: stringItem }
    })
  }

  return (
    <FlatList
      data={cigars}
      renderItem={({ item }) => <CigarListItem item={item} onPressCigar={() => onPressCigar(item)} />}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={<Text>Add some Cigars!</Text>}
      refreshControl={<RefreshControl onRefresh={fetchFunction} refreshing={loading} />}
    />
  );
};

export default CigarList;
