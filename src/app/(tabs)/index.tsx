import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const XP_POR_COLETA = 10;
const NIVEIS = {
  INICIANTE: { min: 0, max: 100, label: 'Iniciante' },
  INTERMEDIARIO: { min: 101, max: 300, label: 'Intermediário' },
  AVANCADO: { min: 301, max: 9999, label: 'Avançado' },
};

export default function HomeScreen() {
  const router = useRouter();

  const [xp, setXp] = useState(40);
  const [streak, setStreak] = useState(3);
  const [nivelAtual, setNivelAtual] = useState(NIVEIS.INICIANTE);
  const [podeCheckin, setPodeCheckin] = useState(true);

  useEffect(() => {
    if (xp <= NIVEIS.INICIANTE.max) setNivelAtual(NIVEIS.INICIANTE);
    else if (xp <= NIVEIS.INTERMEDIARIO.max) setNivelAtual(NIVEIS.INTERMEDIARIO);
    else setNivelAtual(NIVEIS.AVANCADO);
  }, [xp]);

  const realizarCheckIn = () => {
    Alert.alert(
      "Check-in Confirmado!",
      `Você reciclou e ganhou +${XP_POR_COLETA} XP!`,
      [{ text: "OK" }]
    );

    setXp(prev => prev + XP_POR_COLETA);
    setPodeCheckin(false);
    
    // Simula cooldown de 30 segundos
    setTimeout(() => {
      setPodeCheckin(true);
    }, 30000);
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
        
        {/* --- Minimapa Mockado --- */}
        <View style={styles.mapContainer}>
          <Text style={styles.sectionTitle}>Mapa de Coleta</Text>
          <View style={styles.mapWrapper}>
            <Image 
              source={require('../../../assets/images/minimap.png')} 
              style={styles.mapImage}
              resizeMode="cover"
            />
            
            {/* Demo badge sobre o mapa */}
            <View style={styles.demoBadge}>
              <Text style={styles.demoBadgeText}>DEMO</Text>
            </View>
            
            {/* Botão sobre o mapa */}
            <TouchableOpacity 
              style={styles.expandMapButton} 
              onPress={() => router.push('/map')}
            >
              <Ionicons name="expand" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* --- Área de Ação Mockada --- */}
        <View style={styles.actionArea}>
          <Text style={styles.actionTitle}>Simular Coleta</Text>
          <Text style={styles.actionSubtitle}>Teste a funcionalidade de check-in</Text>
          
          {podeCheckin ? (
            <TouchableOpacity style={styles.checkInButton} onPress={realizarCheckIn}>
              <Ionicons name="checkmark-circle" size={24} color="#fff" />
              <Text style={styles.checkInText}>FAZER CHECK-IN</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.disabledButton}>
              <Ionicons name="time" size={24} color="#999" />
              <Text style={styles.disabledText}>Aguarde para próxima coleta</Text>
            </View>
          )}
        </View>

        {/* --- Evolução e Nível --- */}
        <View style={styles.progressContainer}>
          <Text style={styles.sectionTitle}>Sua Evolução</Text>
          
          <View style={styles.levelCard}>
            <View style={styles.levelHeader}>
              <View style={styles.levelInfo}>
                <Text style={styles.levelLabel}>Nível: {nivelAtual.label}</Text>
                <Text style={styles.xpLabel}>{xp} / {nivelAtual.max} XP</Text>
              </View>
              
              <View style={styles.medalhaContainer}>
                <Image 
                  source={require('../../../assets/images/medalha-iniciante.png')} 
                  style={styles.medalha}
                  resizeMode="cover"
                />
              </View>
            </View>

            {/* Barra de Progresso */}
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: `${progressoNivel}%` }]} />
            </View>
            
            <Text style={styles.levelFooter}>
              Faltam {nivelAtual.max - xp} XP para o próximo nível!
            </Text>
          </View>
        </View>

        {/* --- Estatísticas Rápidas --- */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Estatísticas</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="leaf" size={24} color="#4CAF50" />
              <Text style={styles.statValue}>15</Text>
              <Text style={styles.statLabel}>Coletas</Text>
            </View>
            
            <View style={styles.statCard}>
              <Ionicons name="planet" size={24} color="#2196F3" />
              <Text style={styles.statValue}>2.5kg</Text>
              <Text style={styles.statLabel}>Reciclados</Text>
            </View>
            
            <View style={styles.statCard}>
              <Ionicons name="trophy" size={24} color="#FF9800" />
              <Text style={styles.statValue}>{streak}</Text>
              <Text style={styles.statLabel}>Sequência</Text>
            </View>
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

  // Mapa Mockado
  mapContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    fontFamily: 'Poppins-Bold',
  },
  mapWrapper: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    backgroundColor: '#ddd',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  demoBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255, 152, 0, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  demoBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  expandMapButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 20,
  },

  // Área de Ação
  actionArea: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
    elevation: 2,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    fontFamily: 'Poppins-Bold',
  },
  actionSubtitle: {
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
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
    fontFamily: 'Poppins-Bold',
  },
  disabledButton: {
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    gap: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  disabledText: {
    color: '#999',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },

  // Progress Bar
  progressContainer: {
    marginBottom: 30,
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
    alignItems: 'center',
    marginBottom: 15,
  },
  levelInfo: {
    flex: 1,
  },
  levelLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6b1a82',
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
  },
  xpLabel: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  medalhaContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 35,
    padding: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  medalha: {
    width: 50,
    height: 50,
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
    backgroundColor: '#6b1a82',
    borderRadius: 6,
  },
  levelFooter: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
    fontFamily: 'Poppins-Regular',
  },

  // Estatísticas
  statsContainer: {
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
    fontFamily: 'Poppins-Bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
    fontFamily: 'Poppins-Regular',
  },
  mascote: {
    width: 50,
    height: 50,
    marginRight: 10,
  }
});