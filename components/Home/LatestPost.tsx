import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '@/data/Colors';
import axios from 'axios';
import PostList from '../Post/PostList';

export default function LatestPost() {
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
    setPosts(result?.data);
    setLoading(false);
  };

  return (
    <View style={{ marginTop: 15 }}>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Pressable onPress={() => setSelectedTab(0)}>
          <Text
            style={[
              styles.tabText,
              {
                backgroundColor:
                  selectedTab == 0 ? Colors.PRIMARY : Colors.WHITE,
                color: selectedTab == 0 ? Colors.WHITE : Colors.PRIMARY,
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
                  selectedTab == 1 ? Colors.PRIMARY : Colors.WHITE,
                color: selectedTab == 1 ? Colors.WHITE : Colors.PRIMARY,
              },
            ]}
          >
            Trending
          </Text>
        </Pressable>
      </View>

      <PostList posts={posts} loading={loading} OnRefresh={GetPosts} />
    </View>
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
