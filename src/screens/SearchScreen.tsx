import { ActivityIndicator, SectionList, StyleSheet, Text, View } from 'react-native';
import { SearchBar } from '../components/SearchBar';
import { LocationResultItem } from '../components/LocationResultItem';
import { useLocationSearch } from '../hooks/useLocationSearch';
import { LocationRecord } from '../types/location';

export function SearchScreen() {
  const {
    query,
    setQuery,
    results,
    similarResults,
    loading,
    error,
    savingLocation,
    selectLocation,
  } = useLocationSearch();

  const sections = [];
  if (results.length > 0) {
    sections.push({ title: 'Saved locations', data: results });
  }
  if (similarResults.length > 0) {
    sections.push({
      title: results.length > 0 ? 'Similar locations' : 'From Google Places',
      data: similarResults,
    });
  }

  return (
    <View style={styles.container}>
      <SearchBar value={query} onChangeText={setQuery} />

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={keyForLocation}
          renderItem={({ item }) => (
            <LocationResultItem
              location={item}
              saving={savingLocation === item.name}
              onPress={selectLocation}
            />
          )}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sourceLabel}>{section.title}</Text>
          )}
          ListEmptyComponent={
            query.trim().length >= 2 ? (
              <View style={styles.centered}>
                <Text style={styles.emptyText}>No results found</Text>
              </View>
            ) : undefined
          }
        />
      )}
    </View>
  );
}

function keyForLocation(location: LocationRecord, index: number) {
  return location.id?.toString() ?? `${location.name}-${index}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    paddingTop: 40,
    alignItems: 'center',
  },
  errorText: {
    color: '#c00',
    fontSize: 14,
  },
  emptyText: {
    color: '#666',
    fontSize: 14,
  },
  sourceLabel: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
    backgroundColor: '#fff',
  },
});
