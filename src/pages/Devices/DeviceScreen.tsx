import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  RefreshControl,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Container, Header, Title } from '../Home2/styled';
import { DeviceApi } from '../../services';

const DeviceScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [connectedDevices, setConnectedDevices] = useState([]);
  const [disconnectedDevices, setDisconnectedDevices] = useState([]);

  const fetchDevices = async () => {
    try {
      const local = await DeviceApi.scanLocalDevices();
      setConnectedDevices(local);

      const wifi = await DeviceApi.scanWifiDevices();
      setDisconnectedDevices(wifi);
    } catch (error) {
      console.error('Erro ao escanear dispositivos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDevices();
  };

  return (
    <Container>
      <Header>
        <Title>Dispositivos</Title>
      </Header>

      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#44A266"
            style={{ marginTop: 20 }}
          />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <Text style={styles.sectionTitle}>
              Dispositivos conectados a rede
            </Text>
            {connectedDevices.length > 0 ? (
              connectedDevices.map(item => (
                <View key={item.host} style={styles.deviceCard}>
                  <Text style={styles.label}>
                    Host: <Text style={styles.value}>{item.host}</Text>
                  </Text>
                  <Text style={styles.label}>
                    MAC: <Text style={styles.value}>{item.mac}</Text>
                  </Text>
                  <Text style={styles.label}>
                    Sinal:{' '}
                    <Text style={styles.value}>
                      {DeviceApi.rssiToPorcent(item.rssi)}%
                    </Text>
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>
                Nenhum dispositivo encontrado na rede.
              </Text>
            )}

            <Text style={styles.sectionTitle}>Dispositivos fora da Rede</Text>
            {disconnectedDevices.length > 0 ? (
              disconnectedDevices.map(item => (
                <View key={item.BSSID} style={styles.deviceCardRow}>
                  <Image
                    source={require('../../assets/device01.png')}
                    style={styles.deviceImage}
                  />
                  <View style={styles.deviceInfo}>
                    <Text style={styles.deviceName}>
                      {DeviceApi.getWifiName(item.BSSID)}
                    </Text>
                    <Text style={styles.deviceDetail}>
                      ID: {DeviceApi.getID(item.BSSID)}
                    </Text>
                    <Text style={styles.deviceDetail}>
                      Sinal {item.level} dBm 📶
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>
                Nenhum dispositivo em modo configuração.
              </Text>
            )}
          </ScrollView>
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 15,
  },
  deviceCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    elevation: 4,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  deviceCardRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    elevation: 4,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  deviceImage: { width: 50, height: 50, marginRight: 15 },
  deviceInfo: { flex: 1 },
  deviceName: { fontWeight: 'bold', fontSize: 16 },
  deviceDetail: { color: '#666', fontSize: 12 },
  label: { fontWeight: 'bold', color: '#666' },
  value: { fontWeight: 'normal', color: '#333' },
  emptyText: {
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default DeviceScreen;
