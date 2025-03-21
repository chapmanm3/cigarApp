import React from 'react';
import {
  FlatList,
} from 'react-native';
// Import either cigarListStyles or cigarGridStyles depending on the selected layout
import { CigarListItem } from './cigarListItem';
import { UserCigar, UsersCigars } from '@/api/cigarsQueries';

// Assuming you have a ThemeContext
// import { ThemeContext } from './ThemeContext';

interface CigarListProps {
  cigars: UsersCigars;
}

const CigarList: React.FC<CigarListProps> = ({
  cigars,
}) => {
  // const { theme } = useContext(ThemeContext); // Get the current theme

  const onPressCigar = (item: UserCigar) => {
    console.log("Cigar Pressed")
  }

  return (
    <FlatList
      data={cigars}
      renderItem={({ item }) => <CigarListItem item={item} onPressCigar={onPressCigar} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default CigarList;
