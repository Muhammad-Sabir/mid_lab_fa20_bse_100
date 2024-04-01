import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Switch,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import QuranData from "./QuranData";

const QuranScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tab, setTab] = useState("Surah");
  const [darkMode, setDarkMode] = useState(false);

  const ishaTime = "19:30";
  const location = "Lahore, Pakistan";

  const filteredItems =
    tab === "Surah" ? QuranData.surahNames : QuranData.juzzNames;
  const filteredSurahs = filteredItems.filter(
    (item) =>
      item.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameArabic.includes(searchQuery)
  );

  const toggleTab = (selectedTab) => {
    setTab(selectedTab);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={[styles.hero, darkMode && styles.darkHero]}>
        <Text style={[styles.heroSubText, darkMode && styles.darkHeroSubText]}>
          Isha Time
        </Text>
        <Text style={[styles.heroText, darkMode && styles.darkHeroText]}>
          {ishaTime}
        </Text>
        <Text style={[styles.heroSubText, darkMode && styles.darkHeroSubText]}>
          {location}
        </Text>
      </View>
      <View style={styles.header}>
        <TextInput
          style={[styles.searchInput, darkMode && styles.darkSearchInput]}
          placeholder="Search Surah or Juzz"
          placeholderTextColor={darkMode ? "#666" : "#999"}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              tab === "Surah" && styles.activeTab,
              darkMode && styles.darkTabButton,
            ]}
            onPress={() => toggleTab("Surah")}
          >
            <Text style={[styles.tabText, darkMode && styles.darkTabText]}>
              Surah
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              tab === "Juzz" && styles.activeTab,
              darkMode && styles.darkTabButton,
            ]}
            onPress={() => toggleTab("Juzz")}
          >
            <Text style={[styles.tabText, darkMode && styles.darkTabText]}>
              Juzz
            </Text>
          </TouchableOpacity>
        </View>
        <Switch
          style={styles.darkModeSwitch}
          trackColor={{ false: "#ccc", true: "#666" }}
          thumbColor={darkMode ? "#fff" : "#f4f3f4"}
          value={darkMode}
          onValueChange={toggleDarkMode}
        />
      </View>
      <FlatList
        data={filteredSurahs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.surahItem, darkMode && styles.darkSurahItem]}>
            <View style={styles.surahNumberContainer}>
              <Text
                style={[styles.surahNumber, darkMode && styles.darkSurahNumber]}
              >
                {item.id}
              </Text>
            </View>
            <View style={styles.surahNameContainer}>
              <Text
                style={[styles.surahName, darkMode && styles.darkSurahName]}
              >
                {item.nameEnglish}
              </Text>
              <Text
                style={[
                  styles.surahNameArabic,
                  darkMode && styles.darkSurahNameArabic,
                ]}
              >
                {item.nameArabic}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  darkContainer: {
    backgroundColor: "#333",
  },
  hero: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
  darkHero: {
    backgroundColor: "#444",
  },
  heroText: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  darkHeroText: {
    color: "#ddd",
  },
  heroSubText: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    fontWeight: "bold",
  },
  darkHeroSubText: {
    color: "#999",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginRight: 10,
    color: "#333",
  },
  darkSearchInput: {
    backgroundColor: "#444",
    color: "#ddd",
  },
  tabs: {
    flexDirection: "row",
  },
  tabButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: "#ccc",
  },
  darkTabButton: {
    backgroundColor: "#555",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  darkTabText: {
    color: "#ddd",
  },
  darkModeSwitch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  surahItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  darkSurahItem: {
    backgroundColor: "#444",
    borderBottomWidth: 0,
  },
  surahNumberContainer: {
    marginRight: 10,
    backgroundColor: "#ccc",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  surahNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  darkSurahNumber: {
    color: "#fff",
  },
  surahNameContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  surahName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  darkSurahName: {
    color: "#ddd",
  },
  surahNameArabic: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "right",
    color: "#555",
  },
  darkSurahNameArabic: {
    color: "#aaa",
  },
});

export default QuranScreen;
