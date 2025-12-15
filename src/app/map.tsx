import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import React from 'react';
import { Alert, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MapScreen() {
  const handleBackToHome = () => {
    router.back();
  };

  const handleLocationPress = () => {
    Alert.alert(
      "Localização",
      "Funcionalidade de GPS disponível na versão completa",
      [{ text: "OK" }]
    );
  };

  const handleFilterPress = () => {
    Alert.alert(
      "Filtros",
      "Filtros de pontos de coleta disponíveis na versão completa",
      [{ text: "OK" }]
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" backgroundColor="#6b1a82" />

      {/* Header com botão de voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackToHome} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mapa de Coleta</Text>
        <TouchableOpacity onPress={handleFilterPress} style={styles.filterButton}>
          <Ionicons name="options" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Imagem do mapa em tela cheia */}
      <View style={styles.mapContainer}>
        <Image 
          source={require('../../assets/images/mapa-tela-cheia.png')} 
          style={styles.mapImage}
          resizeMode="cover"
        />
        
        {/* Badge de demo */}
        <View style={styles.demoBadge}>
          <Text style={styles.demoBadgeText}>PROTÓTIPO</Text>
        </View>

        {/* Botão de localização */}
        <TouchableOpacity 
          style={styles.locationButton} 
          onPress={handleLocationPress}
        >
          <Ionicons name="locate" size={24} color="#6b1a82" />
        </TouchableOpacity>

        {/* Legenda */}
        <View style={styles.legendContainer}>
          <Text style={styles.legendTitle}>Legenda</Text>
          <View style={styles.legendItems}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]} />
              <Text style={styles.legendText}>Pontos de Coleta</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#FF9800' }]} />
              <Text style={styles.legendText}>Você está aqui</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Informações na parte inferior */}
      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={20} color="#6b1a82" />
          <Text style={styles.infoText}>
            Encontre pontos de coleta próximos a você
          </Text>
        </View>
        
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/(tabs)')}>
          <Ionicons name="home" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>VOLTAR AO INÍCIO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ffe0',
  },
  
  // Header
  header: {
    backgroundColor: '#6b1a82',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Belleza',
    fontWeight: 'bold',
  },
  filterButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },

  // Mapa
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapImage: {
    width: 900,
    height: '100%',
  },
  demoBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 152, 0, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    elevation: 3,
  },
  demoBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  locationButton: {
    position: 'absolute',
    bottom: 120,
    right: 20,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  legendContainer: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 15,
    borderRadius: 12,
    elevation: 3,
    minWidth: 180,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Poppins-Bold',
  },
  legendItems: {
    gap: 6,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },

  // Informações inferiores
  infoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    gap: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#0369a1',
    fontFamily: 'Poppins-Regular',
  },
  actionButton: {
    backgroundColor: '#6b1a82',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    elevation: 2,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
});
