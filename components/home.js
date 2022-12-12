import React, { useEffect, useState } from 'react';
import { Text, View, Image, TextInput, StyleSheet, ScrollView, FlatList, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import Swiper from 'react-native-swiper';
import COLORS from './home/colors';
import axios from 'axios'
const width = Dimensions.get('window').width / 2 - 30;


const HomePage = ({ navigation }) => {
  const [catergoryIndex, setCategoryIndex] = React.useState(0);
  const [data, setData] = useState([])

  const categories = ['POPULAR', 'ORGANIC', 'INDOORS', 'SYNTHETIC'];

  useEffect(() => {
    axios.get('http://103.197.184.55:8080/api/footwears').then((res) => setData(res.data)).catch((err) => console.log(err))
  }, [])

  const CategoryList = () => {
    return (
      <View style={style.categoryContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setCategoryIndex(index)}>
            <Text
              style={[
                style.categoryText,
                catergoryIndex === index && style.categoryTextSelected,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const Card = ({ shoe }) => {

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Details', shoe)}>
        <View style={style.card}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
            }}>
            <Image
              style={{ width: 115, height: 115 }}
              source={{ uri: shoe.image }}
            />
          </View>

          <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10 }}>
            {`${shoe.name}`.slice(0, 19)} ...
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Text style={{ fontSize: 19, fontWeight: 'bold' }}>
              {shoe.price} Đ
            </Text>
            <View
              style={{
                height: 25,
                width: 25,
                backgroundColor: COLORS.green,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5
              }}>
              <Text
                style={{ color: COLORS.white, fontWeight: 'bold' }}>
                +
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white }}>
      <View style={style.header}>
        <View>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Welcome to</Text>
          <Text style={{ fontSize: 38, color: COLORS.green, fontWeight: 'bold' }}>
            Shoes Shop
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 5, }}>
        <View style={style.sliderContainer}>
          <Swiper
            autoplay
            horizontal={false}
            height={200}
            activeDotColor="#FF6347">
            <View style={style.slide}>
              <Image
                source={require('../assets/banners/shoe-banner1.jpg')}
                resizeMode="cover"
                style={style.sliderImage}
              />
            </View>
            <View style={style.slide}>
              <Image
                source={require('../assets/banners/shoe-banner2.jpg')}
                resizeMode="cover"
                style={style.sliderImage}
              />
            </View>
            <View style={style.slide}>
              <Image
                source={require('../assets/banners/shoe-banner3.jpg')}
                resizeMode="cover"
                style={style.sliderImage}
              />
            </View>
          </Swiper>
        </View>

      </View>
      <CategoryList />
      <FlatList
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={data}
        renderItem={({ item }) => {
          return <Card shoe={item} />;
        }}
      />
      <View style={{ paddingBottom: 20 }}></View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  categoryText: { fontSize: 16, color: 'grey', fontWeight: 'bold' },
  categoryTextSelected: {
    color: COLORS.green,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.green,
  },
  card: {
    height: 250,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  header: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: COLORS.dark,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderContainer: {
    height: 200,
    width: '100%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
});

export default HomePage;
