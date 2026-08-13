import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { LocationRecord } from '../types/location';

interface LocationResultItemProps {
  location: LocationRecord;
  saving: boolean;
  onPress: (location: LocationRecord) => void;
}

export function LocationResultItem({ location, saving, onPress }: LocationResultItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={() => onPress(location)}
      disabled={saving}
    >
      <View style={styles.textContainer}>
        <Text style={styles.name}>{location.name}</Text>
        {location.address ? <Text style={styles.address}>{location.address}</Text> : null}
      </View>
      {saving ? <ActivityIndicator size="small" /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pressed: {
    backgroundColor: '#f5f5f5',
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  address: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
});
