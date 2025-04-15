import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '@/data/Colors';
import Header from '@/components/Home/Header';
import Category from '@/components/Home/Category';
import PostCard from '@/components/Post/PostCard';
import axios from 'axios';

export default function Home() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetPosts();
  }, []);

  const GetPosts = async () => {
    setLoading(true);
    const result = await axios.get(
      process.env.EXPO_PUBLIC_HOST_URL + '/post?club=0&orderField=post.id'
    );
    setPosts(result?.data || []);
    setLoading(false);
  };

  return (
    <FlatList
      data={posts}
      refreshing={loading}
      onRefresh={GetPosts}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={{ paddingHorizontal: 3 }}>
          <PostCard post={item} />
        </View>
      )}
      ListHeaderComponent={
        <View style={{ padding: 20, paddingTop: 40 }}>
          {/* Header */}
          <Header />

          {/* Category */}
          <Category />

          {/* Tabs */}
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 15 }}>
            <Pressable onPress={() => setSelectedTab(0)}>
              <Text
                style={[
                  styles.tabText,
                  {
                    backgroundColor:
                      selectedTab === 0 ? Colors.PRIMARY : Colors.WHITE,
                    color: selectedTab === 0 ? Colors.WHITE : Colors.PRIMARY,
                  },
                ]}
              >
                Latest
              </Text>
            </Pressable>
            <Pressable onPress={() => setSelectedTab(1)}>
              <Text
                style={[
                  styles.tabText,
                  {
                    backgroundColor:
                      selectedTab === 1 ? Colors.PRIMARY : Colors.WHITE,
                    color: selectedTab === 1 ? Colors.WHITE : Colors.PRIMARY,
                  },
                ]}
              >
                Trending
              </Text>
            </Pressable>
          </View>
        </View>
      }
      contentContainerStyle={{ paddingBottom: 100 }}
      style={{ backgroundColor: Colors.CHARCOAL }}
    />
  );
}

const styles = StyleSheet.create({
  tabText: {
    padding: 4,
    fontSize: 20,
    paddingHorizontal: 15,
    borderRadius: 99,
  },
});
