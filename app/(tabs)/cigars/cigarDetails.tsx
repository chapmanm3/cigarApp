import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { detailsStyles } from './cigarDetailsStyles';
import { router, useLocalSearchParams } from 'expo-router';
import { UserCigar, deleteCigar } from '@/api/cigarsQueries';
import { useRoute } from '@react-navigation/native';

interface CigarDetailScreenProps { }

interface RouteParams {
  cigar: {
    id: string;
    name: string;
    brand: string;
    vitola: string;
    origin: string;
    wrapper: string;
    binder: string;
    filler: string;
    strength: string;
    purchase_date: string;
    price: number;
    quantity: number;
    notes: string;
    image_url?: string;
  };
}

const CigarDetailScreen: React.FC<CigarDetailScreenProps> = () => {
  const { cigarString } = useLocalSearchParams<{ cigarString: string }>()
  const cigar = JSON.parse(cigarString)

  const styles = detailsStyles

  const handleDeleteCigar = () => {
    Alert.alert(
      'Delete Cigar',
      'Are you sure you want to delete this cigar?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteCigar(parseInt(cigar.id))
              console.log('Cigar deleted successfully');
              router.back()
            } catch (error) {
              console.error('Error deleting cigar:', error);
              Alert.alert('Error', 'Failed to delete cigar.');
            }
          },
        },
      ],
      { cancelable: false },
    );
  };

  const handleEditCigar = () => {
    //navigation.navigate('EditCigar', { cigar: cigar }); // Navigate to the edit screen
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.imageContainer}>
        <Image
          source={
            cigar.image_url
              ? { uri: cigar.image_url }
              : require("@/assets/images/newIcon.png")
          }
          style={styles.image}
        />
      </TouchableOpacity>

      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{cigar.name}</Text>
        <Text style={styles.brandVitola}>
          {cigar.brand}, {cigar.vitola}
        </Text>

        <Text style={styles.label}>Origin:</Text>
        <Text style={styles.value}>{cigar.origin}</Text>

        <Text style={styles.label}>Wrapper:</Text>
        <Text style={styles.value}>{cigar.wrapper}</Text>

        <Text style={styles.label}>Binder:</Text>
        <Text style={styles.value}>{cigar.binder}</Text>

        <Text style={styles.label}>Filler:</Text>
        <Text style={styles.value}>{cigar.filler}</Text>

        <Text style={styles.label}>Strength:</Text>
        <Text style={styles.value}>{cigar.strength}</Text>

        <Text style={styles.label}>Purchase Date:</Text>
        <Text style={styles.value}>{cigar.purchase_date}</Text>

        <Text style={styles.label}>Price:</Text>
        <Text style={styles.value}>{cigar.price}</Text>

        <Text style={styles.label}>Quantity:</Text>
        <Text style={styles.value}>{cigar.quantity}</Text>

        <Text style={styles.label}>Notes:</Text>
        <Text style={styles.value}>{cigar.notes}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEditCigar}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteCigar}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CigarDetailScreen;

