import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';

const SettingsScreen: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState(true);
  const [autoSave, setAutoSave] = React.useState(true);
  const [cloudSync, setCloudSync] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{false: '#767577', true: '#7A5CFF'}}
            thumbColor={darkMode ? '#43E5FF' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Editor</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Auto-save</Text>
          <Switch
            value={autoSave}
            onValueChange={setAutoSave}
            trackColor={{false: '#767577', true: '#7A5CFF'}}
            thumbColor={autoSave ? '#43E5FF' : '#f4f3f4'}
          />
        </View>
        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingLabel}>Font Size</Text>
          <Text style={styles.settingValue}>14</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingLabel}>Tab Size</Text>
          <Text style={styles.settingValue}>4 spaces</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cloud Services</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Cloud Sync</Text>
          <Switch
            value={cloudSync}
            onValueChange={setCloudSync}
            trackColor={{false: '#767577', true: '#7A5CFF'}}
            thumbColor={cloudSync ? '#43E5FF' : '#f4f3f4'}
          />
        </View>
        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingLabel}>API Endpoint</Text>
          <Text style={styles.settingValue}>Default</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingLabel}>API Key</Text>
          <Text style={styles.settingValue}>Not Set</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Enable Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{false: '#767577', true: '#7A5CFF'}}
            thumbColor={notifications ? '#43E5FF' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingLabel}>Version</Text>
          <Text style={styles.settingValue}>1.0.0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingLabel}>Documentation</Text>
          <Text style={styles.settingValue}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingLabel}>GitHub</Text>
          <Text style={styles.settingValue}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingLabel}>License</Text>
          <Text style={styles.settingValue}>MIT</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Synapse Mobile v1.0.0</Text>
        <Text style={styles.footerText}>Created by Michael Benjamin Crowe</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#2d2d2d',
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 12,
    padding: 15,
  },
  sectionTitle: {
    color: '#7A5CFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#3d3d3d',
  },
  settingLabel: {
    color: '#fff',
    fontSize: 15,
  },
  settingValue: {
    color: '#aaa',
    fontSize: 14,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 12,
    marginBottom: 5,
  },
});

export default SettingsScreen;