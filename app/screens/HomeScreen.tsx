// app/screens/HomeScreen.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { NewsService } from '../services/newsApi';
import { Article, Category } from '../types';
import NewsCard from '../components/NewsCard';
import CategoryButton from '../components/CategoryButton';
import LoadingIndicator from '../components/LoadingIndicator';

const CATEGORIES: Category[] = [
  'general',
  'business',
  'technology',
  'sports',
  'entertainment',
  'health',
  'science',
];

export default function HomeScreen() {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>('general');

  const loadNews = useCallback(async (category: Category = selectedCategory) => {
    try {
      setLoading(true);
      const articles = await NewsService.getTopHeadlines(category);
      setNews(articles);
    } catch (error) {
      console.error('Failed to load news:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadNews();
  };

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    loadNews(category);
  };

  if (loading && !refreshing) {
    return <LoadingIndicator />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Категории */}
        <View style={styles.categoriesContainer}>
          <FlatList
            data={CATEGORIES}
            renderItem={({ item }) => (
              <CategoryButton
                title={item}
                isActive={selectedCategory === item}
                onPress={handleCategoryChange}
              />
            )}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Список новостей */}
        <FlatList
          data={news}
          renderItem={({ item }) => <NewsCard article={item} />}
          keyExtractor={(item) => item.url + item.publishedAt}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#007AFF']}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Новости не найдены</Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
  },
  categoriesContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  categoriesList: {
    paddingHorizontal: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});