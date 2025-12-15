// app/components/CategoryButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Category } from '../types';

interface CategoryButtonProps {
  title: Category;
  isActive: boolean;
  onPress: (category: Category) => void;
}

const categoryLabels: Record<Category, string> = {
  general: 'Главные',
  business: 'Бизнес',
  technology: 'Технологии',
  sports: 'Спорт',
  entertainment: 'Развлечения',
  health: 'Здоровье',
  science: 'Наука',
};

export default function CategoryButton({ 
  title, 
  isActive, 
  onPress 
}: CategoryButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, isActive && styles.activeButton]}
      onPress={() => onPress(title)}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, isActive && styles.activeText]}>
        {categoryLabels[title]}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 4,
    marginVertical: 4,
  },
  activeButton: {
    backgroundColor: '#007AFF',
  },
  text: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeText: {
    color: '#ffffff',
  },
});