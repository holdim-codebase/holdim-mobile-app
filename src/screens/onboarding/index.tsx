import * as React from 'react'
import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import normalize from 'react-native-normalize'
import {SafeAreaView} from 'react-native-safe-area-context'

import Arrow from '../../assets/images/svg/ArrowBack.svg'
import {TSlide} from '../../types'
import styles from './styles'

const {width, height} = Dimensions.get('window')

const offsetSize: number = 32

const slides: TSlide[] = [
  {
    id: '1',
    title: 'Only one dapp',
    subtitle: 'Instead of endless tabs',
  },
  {
    id: '2',
    title: 'AI optimized',
    subtitle: 'Simple language to understand everything',
  },
]

const Slide = ({item}: {item: TSlide}) => {
  return (
    <View
      style={{
        width: Dimensions.get('screen').width - normalize(31),
        height,
        marginTop: '20%',
        flex: 1,
      }}>
      {item.title && <Text style={styles.onboardingTitle}>{item.title}</Text>}
      <Text style={styles.onboardingSubtitle}>{item.subtitle}</Text>
      <Text style={styles.onboardingVerticalLine}>|</Text>
    </View>
  )
}

// TODO change navigation type
const OnboardingScreen = ({navigation}: any) => {
  const [currentSlideIndicator, setCurrentSlideIndicator] =
    React.useState<number>(0)

  const ref = React.useRef<any>()

  const Footer = () => {
    return (
      <View style={styles.onboardingBottom}>
        <View style={styles.btnNextSkipWrapper}>
          <TouchableOpacity style={styles.btnSkip} onPress={goSkip}>
            <Text style={styles.btnSkipNextText}>Skip</Text>
          </TouchableOpacity>
          {currentSlideIndicator !== 0 ? (
            <>
              <View style={{width: '46%'}} />
              <View style={{paddingRight: normalize(12)}}>
                <TouchableOpacity
                  style={styles.btnPrevious}
                  onPress={goPreviousSlide}>
                  <Text style={styles.btnSkipNextText}>
                    <Arrow />
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={{width: '60%'}} />
          )}
          <TouchableOpacity style={styles.btnNext} onPress={goNextSlide}>
            <Text style={styles.btnSkipNextText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  // TODO change e type
  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x
    const currentIndex = Math.round(contentOffsetX / width)
    setCurrentSlideIndicator(currentIndex)
  }

  const goNextSlide = () => {
    const nextSlideIndex: number = currentSlideIndicator + 1
    if (nextSlideIndex != slides.length) {
      const offset: number = nextSlideIndex * width - normalize(offsetSize)
      ref.current && ref.current.scrollToOffset({offset})
      setCurrentSlideIndicator(nextSlideIndex)
    } else {
      navigation.navigate('LoginScreen')
    }
  }

  const goPreviousSlide = () => {
    const previousSlideIndex: number = currentSlideIndicator - 1
    if (currentSlideIndicator != 0) {
      const offset: number = previousSlideIndex * width - normalize(offsetSize)
      ref.current && ref.current.scrollToOffset({offset})
      setCurrentSlideIndicator(previousSlideIndex)
    }
  }

  const goSkip = () => {
    navigation.navigate('LoginScreen')
  }

  return (
    <SafeAreaView style={styles.onboardingWrapper}>
      <StatusBar backgroundColor={'#161616'} />
      <FlatList
        ref={ref}
        style={{width: '100%'}}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        pagingEnabled
        data={slides}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}: ListRenderItemInfo<TSlide>) => (
          <Slide item={item} />
        )}
        keyExtractor={(item: TSlide) => item.id}
      />
      <Footer />
    </SafeAreaView>
  )
}

export default OnboardingScreen
