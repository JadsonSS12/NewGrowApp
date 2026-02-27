import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  RefreshControl, 
  ScrollView, 
  Image, 
  StyleSheet 
} from 'react-native';
import { Container, Header, Title } from '../Home2/styled';

const DeviceScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [connectedDevices, setConnectedDevices] = useState([
    { host: '192.168.0.15', mac: 'b6:e6:2d:6a:b8:17' }
  ]);
  const [disconnectedDevices, setDisconnectedDevices] = useState([
    { SSID: 'ESP-6AB817', BSSID: 'b6:e6:2d:6a:b8:17', level: '78%', capabilities: '[WPA2-PSK-CCMP]' }
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <Container>
      <Header>
        <Title>Dispositivos</Title>
      </Header>

      <View style={styles.content}>
        <ScrollView 
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <Text style={styles.sectionTitle}>Dispositivos conectados a rede</Text>
          {connectedDevices.map((item) => (
            <View key={item.host} style={styles.deviceCard}>
               <Text style={styles.label}>Host: <Text style={styles.value}>{item.host}</Text></Text>
               <Text style={styles.label}>MAC: <Text style={styles.value}>{item.mac}</Text></Text>
            </View>
          ))}

          <Text style={styles.sectionTitle}>Dispositivos fora da Rede</Text>
          {disconnectedDevices.map((item) => (
            <View key={item.SSID} style={styles.deviceCardRow}>
              <Image 
                source={require('../../assets/device01.png')} 
                style={styles.deviceImage} 
              />
              <View style={styles.deviceInfo}>
                <Text style={styles.deviceName}>{item.SSID}</Text>
                <Text style={styles.deviceDetail}>{item.BSSID}</Text>
                <Text style={styles.deviceDetail}>Sinal {item.level} 📶</Text>
              </View>
            </View>
          ))}
        </ScrollView>
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
    padding: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 15
  },
  deviceCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    elevation: 4,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee'
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
    borderColor: '#eee'
  },
  deviceImage: {
    width: 50,
    height: 50,
    marginRight: 15
  },
  deviceInfo: {
    flex: 1
  },
  deviceName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  deviceDetail: {
    color: '#666',
    fontSize: 12
  },
  label: { fontWeight: 'bold', color: '#666' },
  value: { fontWeight: 'normal', color: '#333' }
});

export default DeviceScreen;