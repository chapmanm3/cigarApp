import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { detailsStyles } from '../cigars/cigarDetailsStyles';
import { router, useLocalSearchParams } from 'expo-router';
import { UserHumidor, deleteHumidor } from '@/api/humidorQueries';

interface HumidorDetailScreenProps { }

interface RouteParams {
  humidor: UserHumidor
}

const HumidorDetailScreen: React.FC<HumidorDetailScreenProps> = () => {
  const { humidorString } = useLocalSearchParams<{ humidorString: string }>()
  const humidor: UserHumidor = JSON.parse(humidorString)

  const styles = detailsStyles

  const handleDeleteCigar = () => {
    Alert.alert(
      'Delete Humidor',
      'Are you sure you want to delete this humidor?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteHumidor(humidor.id)
              console.log('Humidor deleted successfully');
              router.back()
            } catch (error) {
              console.error('Error deleting humidor:', error);
              Alert.alert('Error', 'Failed to delete humidor.');
            }
          },
        },
      ],
      { cancelable: false },
    );
  };

  const handleEditHumidor = () => {
    //navigation.navigate('EditCigar', { cigar: cigar }); // Navigate to the edit screen
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.imageContainer}>
        <Image
          source={
            humidor.image_url
              ? { uri: humidor.image_url }
              : require("@/assets/images/newIcon.png")
          }
          style={styles.image}
        />
      </TouchableOpacity>

      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{humidor.name}</Text>
        <Text style={styles.label}>Capacity:</Text>
        <Text style={styles.value}>{humidor.capacity}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEditHumidor}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteCigar}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HumidorDetailScreen;

