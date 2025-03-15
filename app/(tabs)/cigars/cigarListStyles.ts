import { StyleSheet } from 'react-native';

const cigarListStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  cigarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', // Light border color
  },
  cigarImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  cigarInfo: {
    flex: 1,
  },
  cigarName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Dark text color
  },
  cigarDetails: {
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
  darkCigarItem: {
    borderBottomColor: '#333', // Dark border color
  },
  darkCigarName: {
    color: '#fff', // White text
  },
  darkCigarDetails: {
    color: '#ccc', // Light gray text
  },
});

export default cigarListStyles;
