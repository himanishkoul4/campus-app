import { View, FlatList } from 'react-native';
import React from 'react';
import PostCard from './PostCard';

type PostListProps = {
  posts: any[];
  OnRefresh: () => Promise<void>;
  loading: boolean;
};

export default function PostList({ posts, OnRefresh, loading }: PostListProps) {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item, index) => index.toString()}
      onRefresh={OnRefresh}
      refreshing={loading}
      renderItem={({ item }) => (
        <View style={{ paddingHorizontal: 3 }}>
          <PostCard post={item} />
        </View>
      )}
    />
  );
}
