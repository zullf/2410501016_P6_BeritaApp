import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  const load = async () => {
    const data = await AsyncStorage.getItem('bookmarks');
    const parsed = data ? JSON.parse(data) : [];
    const clean = parsed.filter((item: any) => item && item.url);
    setBookmarks(clean);
  };
  const add = async (item: any) => {
    if (!item || !item.url) return; 
    
    const exists = bookmarks.find((b) => b.url === item.url);
    if (exists) return;

    const updated = [...bookmarks, item];
    setBookmarks(updated);
    await AsyncStorage.setItem('bookmarks', JSON.stringify(updated));
  };

  const remove = async (url: string) => {
    const updated = bookmarks.filter((b) => b && b.url !== url);
    setBookmarks(updated);
    await AsyncStorage.setItem('bookmarks', JSON.stringify(updated));
  };

  useEffect(() => {
    load();
  }, []);

  return { bookmarks, add, remove };
};