import { StyleSheet } from 'react-native'

export const humidorListStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  humidorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', // Light border color
  },
  humidorImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  humidorInfo: {
    flex: 1,
  },
  humidorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Dark text color
  },
  humidorDetails: {
    fontSize: 14,
    color: '#666', // Medium gray text
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 40,
    height: 40,
    backgroundColor: '#654321', // Primary color
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff', // White text
    fontSize: 20,
    fontWeight: 'bold',
  },
  //Dark Mode
  darkHumidorItem: {
    borderBottomColor: '#333', // Dark border color
  },
  darkHumidorName: {
    color: '#fff', // White text
  },
  darkHumidorDetails: {
    color: '#ccc', // Light gray text
  },

})
