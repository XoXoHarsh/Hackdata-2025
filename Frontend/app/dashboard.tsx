import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { Feather, Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Screen Time Tab Component
const ScreenTimeTab = () => {
  // Sample screen time data
  const appUsageData = [
    { name: 'Social Media', usage: 152, color: '#FF6384', icon: 'instagram' },
    { name: 'Entertainment', usage: 98, color: '#36A2EB', icon: 'youtube' },
    { name: 'Productivity', usage: 45, color: '#FFCE56', icon: 'file-document' },
    { name: 'Games', usage: 73, color: '#4BC0C0', icon: 'gamepad-variant' },
    { name: 'Fitness', usage: 30, color: '#9966FF', icon: 'run' },
  ];

  // Weekly screen time data
  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [3.2, 2.8, 4.5, 3.9, 5.2, 6.1, 4.2],
      },
    ],
  };

  // Create data for pie chart
  const pieChartData = appUsageData.map(app => ({
    name: app.name,
    usage: app.usage,
    color: app.color,
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));

  return (
    <ScrollView style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Today's Screen Time</Text>
      <View style={styles.totalTimeCard}>
        <Text style={styles.totalTimeValue}>6h 38m</Text>
        <Text style={styles.totalTimeLabel}>Total Screen Time</Text>
        <Text style={styles.totalTimeCompare}>
          <Feather name="arrow-up" size={14} color="#FF6384" /> 22% from yesterday
        </Text>
      </View>

      <Text style={styles.sectionTitle}>App Usage Breakdown</Text>
      <View style={styles.chartContainer}>
        <PieChart
          data={pieChartData}
          width={width - 40}
          height={200}
          chartConfig={{
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          }}
          accessor="usage"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      <Text style={styles.sectionTitle}>Most Used Apps</Text>
      {appUsageData.map((app, index) => (
        <View key={index} style={styles.appUsageItem}>
          <View style={[styles.appIconContainer, { backgroundColor: app.color }]}>
          <MaterialCommunityIcons name={app.icon as keyof typeof MaterialCommunityIcons.glyphMap} size={22} color="white" />
          </View>
          <View style={styles.appUsageDetails}>
            <Text style={styles.appName}>{app.name}</Text>
            <View style={styles.usageBarContainer}>
              <View
                style={[
                  styles.usageBar,
                  { width: `${(app.usage / 180) * 100}%`, backgroundColor: app.color }
                ]}
              />
            </View>
          </View>
          <Text style={styles.usageTime}>{Math.floor(app.usage / 60)}h {app.usage % 60}m</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Weekly Trend</Text>
      <View>
      <LineChart
          data={weeklyData}
          width={width - 40}
          height={220}
          yAxisSuffix="h"
          chartConfig={{
            backgroundColor: '#393E6F',
            backgroundGradientFrom: '#4A4F88', // Slightly lighter bluish-purple
            backgroundGradientTo: '#2C315C', // Darker bluish-indigo

            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: 'white',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>

      <View style={styles.spacer} />
    </ScrollView>
  );
};

// Fitness Stats Tab Component
const FitnessStatsTab = () => {
  // Heart rate data
  const heartRateData = {
    labels: ['6am', '9am', '12pm', '3pm', '6pm', '9pm'],
    datasets: [
      {
        data: [68, 72, 85, 78, 90, 75],
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  // Sleep data
  const sleepData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [7.2, 6.8, 8.1, 7.5, 6.9, 8.4, 7.8],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  // Health metrics
  const healthMetrics = [
    { name: 'Heart Rate', value: '72', unit: 'bpm', icon: 'heart', color: '#FF6384' },
    { name: 'Blood Oxygen', value: '98', unit: '%', icon: 'droplet', color: '#36A2EB' },
    { name: 'Steps', value: '8,752', unit: 'steps', icon: 'activity', color: '#FFCE56' },
    { name: 'Calories', value: '1,845', unit: 'cal', icon: 'zap', color: '#4BC0C0' },
  ];

  return (
    <ScrollView style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Today's Health Summary</Text>

      <View style={styles.healthMetricsContainer}>
        {healthMetrics.map((metric, index) => (
          <View key={index} style={styles.metricCard}>
            <View style={[styles.metricIconContainer, { backgroundColor: metric.color }]}>
            <Feather name={metric.icon as keyof typeof Feather.glyphMap} size={24} color="white" />
            </View>
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={styles.metricName}>{metric.name}</Text>
            <Text style={styles.metricUnit}>{metric.unit}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Heart Rate (Today)</Text>
      <View >
        <LineChart
          data={heartRateData}
          width={width - 40}
          height={220}
          yAxisSuffix=" bpm"
          chartConfig={{
            backgroundColor: '#393E6F',
            backgroundGradientFrom: '#4A4F88', // Slightly lighter bluish-purple
            backgroundGradientTo: '#2C315C', // Darker bluish-indigo

            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#FF6384',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>

      <Text style={styles.sectionTitle}>Sleep Analysis</Text>
      <View style={styles.sleepSummaryCard}>
        <View style={styles.sleepSummaryHeader}>
          <View>
            <Text style={styles.sleepSummaryTitle}>Last Night's Sleep</Text>
            <Text style={styles.sleepSummaryValue}>7h 45m</Text>
          </View>
          <View style={styles.sleepQualityIndicator}>
            <Text style={styles.sleepQualityText}>Good</Text>
          </View>
        </View>

        <View style={styles.sleepStagesContainer}>
          <View style={styles.sleepStage}>
            <Text style={styles.sleepStageLabel}>Deep</Text>
            <View style={styles.sleepStageBarContainer}>
              <View style={[styles.sleepStageBar, { width: '25%', backgroundColor: '#36A2EB' }]} />
            </View>
            <Text style={styles.sleepStageTime}>1h 56m</Text>
          </View>
          <View style={styles.sleepStage}>
            <Text style={styles.sleepStageLabel}>Light</Text>
            <View style={styles.sleepStageBarContainer}>
              <View style={[styles.sleepStageBar, { width: '45%', backgroundColor: '#4BC0C0' }]} />
            </View>
            <Text style={styles.sleepStageTime}>3h 29m</Text>
          </View>
          <View style={styles.sleepStage}>
            <Text style={styles.sleepStageLabel}>REM</Text>
            <View style={styles.sleepStageBarContainer}>
              <View style={[styles.sleepStageBar, { width: '30%', backgroundColor: '#9966FF' }]} />
            </View>
            <Text style={styles.sleepStageTime}>2h 20m</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Weekly Sleep Pattern</Text>
      <View >
        <LineChart
          data={sleepData}
          width={width - 40}
          height={220}
          yAxisSuffix="h"
          chartConfig={{
            backgroundColor: '#393E6F',
            backgroundGradientFrom: '#4A4F88', // Slightly lighter bluish-purple
            backgroundGradientTo: '#2C315C', // Darker bluish-indigo
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>

      <View style={styles.spacer} />
    </ScrollView>
  );
};

// Main Tracker Component
export default function DashboardScreen() {
  const [activeTab, setActiveTab] = useState('screenTime');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>L</Text>
        </View>
        <Text style={styles.headerTitle}>Lifestyle Tracker</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'screenTime' && styles.activeTabButton]}
          onPress={() => setActiveTab('screenTime')}
        >
          <Ionicons
            name="phone-portrait-outline"
            size={20}
            color={activeTab === 'screenTime' ? 'white' : '#666'}
          />
          <Text
            style={[styles.tabText, activeTab === 'screenTime' && styles.activeTabText]}
          >
            Screen Time
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'fitnessStats' && styles.activeTabButton]}
          onPress={() => setActiveTab('fitnessStats')}
        >
          <Ionicons
            name="fitness-outline"
            size={20}
            color={activeTab === 'fitnessStats' ? 'white' : '#666'}
          />
          <Text
            style={[styles.tabText, activeTab === 'fitnessStats' && styles.activeTabText]}
          >
            Health Stats
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {activeTab === 'screenTime' ? <ScreenTimeTab /> : <FitnessStatsTab />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#4e6cea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: '#F0F0F0',
  },
  activeTabButton: {
    backgroundColor: '#4e6cea',
  },
  tabText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: 'white',
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  totalTimeCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  totalTimeValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4e6cea',

  },
  totalTimeLabel: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  totalTimeCompare: {
    fontSize: 12,
    color: '#666',
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  appUsageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  appIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  appUsageDetails: {
    flex: 1,
  },
  appName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  usageBarContainer: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  usageBar: {
    height: '100%',
    borderRadius: 3,
  },
  usageTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginLeft: 10,
  },
  healthMetricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 15,
    width: '48%',
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  metricIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  metricName: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  metricUnit: {
    fontSize: 12,
    color: '#999',
  },
  sleepSummaryCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sleepSummaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sleepSummaryTitle: {
    fontSize: 16,
    color: '#666',
  },
  sleepSummaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  sleepQualityIndicator: {
    backgroundColor: '#4BC0C0',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  sleepQualityText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  sleepStagesContainer: {
    marginTop: 10,
  },
  sleepStage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sleepStageLabel: {
    width: 50,
    fontSize: 14,
    color: '#666',
  },
  sleepStageBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  sleepStageBar: {
    height: '100%',
    borderRadius: 4,
  },
  sleepStageTime: {
    width: 50,
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  spacer: {
    height: 30,
  },
});