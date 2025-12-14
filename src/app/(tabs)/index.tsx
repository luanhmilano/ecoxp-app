import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const RAIO_CHECKIN = 50; // Metros para permitir check-in
const XP_POR_COLETA = 10;
const NIVEIS = {
  INICIANTE: { min: 0, max: 100, label: 'Iniciante' },
  INTERMEDIARIO: { min: 101, max: 300, label: 'Intermediário' },
  AVANCADO: { min: 301, max: 9999, label: 'Avançado' },
};

const LIXEIRAS = [
  { id: 1, lat: -1.4558, long: -48.4902, nome: 'Praça da República' },
  { id: 2, lat: -1.4520, long: -48.4850, nome: 'Estação das Docas' },
];

export default function HomeScreen() {
  const router = useRouter();

  const [xp, setXp] = useState(40);
  const [streak, setStreak] = useState(3);
  const [nivelAtual, setNivelAtual] = useState(NIVEIS.INICIANTE);

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lixeiraProxima, setLixeiraProxima] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão de localização negada');
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced, // Tenta 'Balanced' ou 'Lowest' para ser mais rápido
      });
      
      setLocation(location);
      
      // Verifica proximidade assim que pega a localização
      verificarProximidade(location.coords);
    })();
  }, []);

  useEffect(() => {
    if (xp <= NIVEIS.INICIANTE.max) setNivelAtual(NIVEIS.INICIANTE);
    else if (xp <= NIVEIS.INTERMEDIARIO.max) setNivelAtual(NIVEIS.INTERMEDIARIO);
    else setNivelAtual(NIVEIS.AVANCADO);
  }, [xp]);

  const getDistanceFromLatLonInMeters = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // Raio da terra em metros
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    return R * c; // Distância em metros
  };

  const verificarProximidade = (coords: { latitude: number; longitude: number }) => {
    const lixeiraEncontrada = LIXEIRAS.find(lixeira => {
      const distancia = getDistanceFromLatLonInMeters(
        coords.latitude, coords.longitude,
        lixeira.lat, lixeira.long
      );
      return distancia <= RAIO_CHECKIN;
    });
    setLixeiraProxima(lixeiraEncontrada || null);
  };

  const realizarCheckIn = () => {
    if (!lixeiraProxima) return;

    Alert.alert(
      "Check-in Confirmado!",
      `Você reciclou em ${lixeiraProxima.nome} e ganhou +${XP_POR_COLETA} XP!`,
      [{ text: "OK" }]
    );

    setXp(prev => prev + XP_POR_COLETA);
    setLixeiraProxima(null); // Esconde o botão temporariamente (lógica simples)
  };

  const progressoNivel = Math.min(100, (xp / nivelAtual.max) * 100);

  return (
    <View style={styles.container}>
      {/* --- Header Roxo --- */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.greetingContainer}>
            <Text style={styles.welcomeText}>Olá, Eco-Amigo!</Text>
            <Text style={styles.subText}>Vamos salvar o planeta hoje?</Text>
          </View>
          <View style={styles.streakContainer}>
            <Ionicons name="flame" size={24} color="#FF9800" />
            <Text style={styles.streakText}>{streak}</Text>
            <Text style={styles.streakLabel}>dias</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollContent} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* --- Minimapa --- */}
        <View style={styles.mapContainer}>
          <Text style={styles.sectionTitle}>Mapa de Coleta</Text>
          <View style={styles.mapWrapper}>
            {location ? (
              <MapView
                style={styles.map}
                // Bloqueia interação para funcionar apenas como visualização "mini"
                scrollEnabled={false} 
                zoomEnabled={false}
                initialRegion={{
                  latitude: -1.4558, // Coordenadas de Belém
                  longitude: -48.4902,
                  latitudeDelta: 0.05, // O Zoom
                  longitudeDelta: 0.05,
                }}
                // region={{
                //   latitude: location.coords.latitude,
                //   longitude: location.coords.longitude,
                //   latitudeDelta: 0.01,
                //   longitudeDelta: 0.01,
                // }}
                // onPress={() => router.push('/full-map')} // Futuro redirecionamento
              >
                {/* Marcador do Usuário */}
                <Marker 
                  coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
                  title="Você está aqui"
                >
                   <Ionicons name="person-circle" size={30} color="#6b1a82" />
                </Marker>

                {/* Marcadores das Lixeiras */}
                {LIXEIRAS.map(lixeira => (
                  <Marker
                    key={lixeira.id}
                    coordinate={{ latitude: lixeira.lat, longitude: lixeira.long }}
                    title={lixeira.nome}
                  >
                    <View style={styles.markerContainer}>
                      <Ionicons name="trash" size={16} color="#fff" />
                    </View>
                  </Marker>
                ))}
              </MapView>
            ) : (
              <View style={styles.loadingMap}>
                <ActivityIndicator color="#6b1a82" />
                <Text style={{ marginTop: 10, color: '#666' }}>Localizando...</Text>
              </View>
            )}
            
            {/* Botão sobre o mapa para expandir */}
            <TouchableOpacity 
              style={styles.expandMapButton} 
              onPress={() => Alert.alert("Navegação", "Ir para o mapa completo (Implementar Tela)")}
            >
              <Ionicons name="expand" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* --- Botão de Ação (Aparece só se estiver perto) --- */}
        {lixeiraProxima && (
          <View style={styles.checkInArea}>
            <Text style={styles.checkInInfo}>Você está perto de: {lixeiraProxima.nome}</Text>
            <TouchableOpacity style={styles.checkInButton} onPress={realizarCheckIn}>
              <Ionicons name="checkmark-circle" size={24} color="#fff" />
              <Text style={styles.checkInText}>FAZER CHECK-IN</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* --- Evolução e Nível --- */}
        <View style={styles.progressContainer}>
          <Text style={styles.sectionTitle}>Sua Evolução</Text>
          
          <View style={styles.levelCard}>
            <View style={styles.levelHeader}>
              <Text style={styles.levelLabel}>Nível: {nivelAtual.label}</Text>
              <Text style={styles.xpLabel}>{xp} / {nivelAtual.max} XP</Text>
            </View>

            {/* Barra de Progresso Customizada */}
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: `${progressoNivel}%` }]} />
            </View>
            
            <Text style={styles.levelFooter}>
              Faltam {nivelAtual.max - xp} XP para o próximo nível!
            </Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ffe0',
  },
  
  // Header Roxo
  header: {
    backgroundColor: '#6b1a82',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'Belleza'
  },
  subText: {
    fontSize: 14,
    color: '#E1BEE7',
  },
  streakContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  streakText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  streakLabel: {
    fontSize: 10,
    color: '#FFB74D',
  },

  // Conteúdo Scrollável
  scrollContent: {
    flex: 1,
    padding: 20,
  },

  // Mapa
  mapContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  mapWrapper: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden', // Importante para arredondar cantos do mapa
    elevation: 4,
    backgroundColor: '#ddd',
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loadingMap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerContainer: {
    backgroundColor: '#2E7D32',
    padding: 5,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  expandMapButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 20,
  },

  // Check-In Area
  checkInArea: {
    backgroundColor: '#E8F5E9',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  checkInInfo: {
    color: '#2E7D32',
    marginBottom: 10,
    fontWeight: '600',
  },
  checkInButton: {
    backgroundColor: '#43A047',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    gap: 8,
    elevation: 3,
  },
  checkInText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Progress Bar
  progressContainer: {
    marginBottom: 20,
  },
  levelCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    elevation: 2,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  levelLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6b1a82', // Roxo do teu tema
  },
  xpLabel: {
    fontSize: 14,
    color: '#666',
  },
  progressBarBackground: {
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6b1a82', // Roxo do teu tema
    borderRadius: 6,
  },
  levelFooter: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  }
});