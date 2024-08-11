import { StyleSheet } from "react-native";


export const cigarCardStyles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '95%',
    height: 200,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  cardImageContainer: {
    flex: 1,
    padding: 10,
  },
  textContainer: {
    flex: 3,
    textAlign: 'center',
    justifyContent: 'center'
  }
})
