import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Wheat, Leaf, CircleDot, Package, ArrowRight } from 'lucide-react-native';

const categories = [
  {
    name: "Grain & Dana Feed",
    description: "High-quality maize, bajra and grain blends sourced from verified suppliers.",
    icon: Wheat,
    color: "bg-amber-100",
    iconColor: "text-amber-700",
    products: 45,
  },
  {
    name: "Rice & By-Products",
    description: "Broken rice, rice bran and polish for balanced poultry nutrition.",
    icon: CircleDot,
    color: "bg-emerald-100",
    iconColor: "text-emerald-700",
    products: 32,
  },
  {
    name: "Dal & Protein Mix",
    description: "Protein-rich dal chuni, pulse residues and feed supplements.",
    icon: Leaf,
    color: "bg-orange-100",
    iconColor: "text-orange-700",
    products: 28,
  },
  {
    name: "Complete Feed Mix",
    description: "Pre-formulated poultry feed for optimal growth and performance.",
    icon: Package,
    color: "bg-blue-100",
    iconColor: "text-blue-700",
    products: 18,
  },
];

export const CategoriesSection = () => {
  return (
    <View className="py-20 bg-background px-4">
      <View className="container">
        {/* Header */}
        <View className="items-center mb-12">
          <Text className="text-3xl font-bold text-foreground mb-4">
            Product <Text className="text-primary">Categories</Text>
          </Text>
          <Text className="text-muted-foreground text-center max-w-2xl">
            Discover quality poultry feed products from trusted sellers across
            the Hindustan Proteins platform.
          </Text>
        </View>

        {/* Category Grid */}
        <View className="gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link href="/products" key={category.name} asChild>
                <TouchableOpacity 
                  className="bg-card rounded-2xl border border-border p-6 shadow-soft"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Icon */}
                  <View className={`${category.color} p-3 rounded-xl mb-4 w-14 h-14 items-center justify-center`}>
                    <Icon size={24} className={category.iconColor} />
                  </View>

                  {/* Title */}
                  <Text className="text-lg font-semibold text-foreground mb-2">
                    {category.name}
                  </Text>

                  {/* Description */}
                  <Text className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {category.description}
                  </Text>

                  {/* Footer */}
                  <View className="flex-row items-center justify-between">
                    <Text className="text-sm text-muted-foreground">
                      {category.products}+ listings
                    </Text>
                    <ArrowRight size={16} className="text-primary" />
                  </View>
                </TouchableOpacity>
              </Link>
            );
          })}
        </View>
      </View>
    </View>
  );
};