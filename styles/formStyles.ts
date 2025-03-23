import { StyleSheet } from "react-native";

export const formStyles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#654321',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    borderColor: '#654321',
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 12,
  },
  secondaryButtonText: {
    color: '#654321',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
