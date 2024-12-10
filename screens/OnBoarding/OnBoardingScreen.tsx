import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import i18n from '../../localization/i18n';


const { width, height } = Dimensions.get('window');

interface Slide {
  id: string;
  title: string;
  description: string;
  image: any;
}



const OnboardingScreen: React.FC = ({ navigation }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {t} = useTranslation();
  const flatListRef = useRef<FlatList>(null); // مرجع إلى FlatList


  useEffect(() => {
    console.log('Current Index Updated:', currentIndex);
  }, [currentIndex]);


  const slides: Slide[] = [
    {
      id: '1',
      title: t('title1'),
      description: t('description1'),
      image:require('../../assets/images/onBoarding1.png'),
    },
    {
      id: '2',
      title:  t('title2'),
      description: t('description2'),
      image: require('../../assets/images/onBoarding2.png'),
    },
    {
      id: '3',
      title:  t('title3'),
      description: t('description3'),
     image: require('../../assets/images/onBoarding3.png'),
    },
  ];

  const changeLanguage = () => { 
    if(i18n.language == 'en'){
      i18n.changeLanguage('ar')
    }else{
      i18n.changeLanguage('en')
    }
 
  }


//   const handleNext = () => {
//     if (currentIndex < slides.length - 1) {
//         console.log('currentIndex', currentIndex)
//       setCurrentIndex(currentIndex + 1);

//     } else {
//       navigation.replace('Tabs'); // Navigate to the main app screen
//     }
//   };
const handleNext = () => {
    
      const newIndex = currentIndex + 1;  // زيادة المؤشر بـ 1
      if (newIndex < slides.length) {
        console.log(newIndex,  "newIndex")
        setCurrentIndex(newIndex); // تحديث الحالة
        flatListRef.current?.scrollToIndex({ index: newIndex, animated: true }); // تمرير FlatList إلى العنصر التالي
      } else {
        navigation.replace('Tabs'); // إذا وصلنا للـ slide الأخير، نقوم بالانتقال
        // العودة للقيمة الحالية إذا تم الانتقال
      }
    }
  

  const renderSlide = ({ item }: { item: Slide }) => (
    <View style={[styles.slide, { width }]}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={changeLanguage}> 
        <Text>{t('change')}</Text>
      </TouchableOpacity>
      <FlatList
       ref={flatListRef} // تمرير المرجع
        data={slides}
        renderItem={renderSlide}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        extraData={currentIndex}  // تأكد من إعادة العرض عندما يتغير currentIndex
        onScroll={(e: any) => {
          const offset = e.nativeEvent.contentOffset.x;
          const index = Math.round(offset / width);
          if (index !== currentIndex) {
            setCurrentIndex(index); // تحديث المؤشر عند التمرير اليدوي
          }
        }}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? t('getStart') : t('next')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '80%',
    height: height * 0.4,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginTop: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;