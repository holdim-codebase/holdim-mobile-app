import * as React from 'react'
import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import normalize from 'react-native-normalize'

import Arrow from '../../assets/images/svg/ArrowBack.svg'
import {TSlide} from '../../types'
import styles from './styles'

const {width} = Dimensions.get('window')

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
      <View style={styles.btnNextSkipWrapper}>
        <TouchableOpacity style={styles.btnSkip} onPress={onSkip}>
          <Text style={styles.btnNextText}>Skip</Text>
        </TouchableOpacity>
        {currentSlideIndicator !== 0 ? (
          <>
            <View style={{width: '46%'}} />
            <View>
              <TouchableOpacity
                style={styles.btnPrevious}
                onPress={onPreviousSlide}>
                <Arrow />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={{width: '60%'}} />
        )}
        <TouchableOpacity style={styles.btnNext} onPress={onNextSlide}>
          <Text style={styles.btnNextText}>Next</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // TODO change e type
  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x
    const currentIndex = Math.round(contentOffsetX / width)
    setCurrentSlideIndicator(currentIndex)
  }

  const onNextSlide = () => {
    const nextSlideIndex: number = currentSlideIndicator + 1
    if (nextSlideIndex != slides.length) {
      const offset: number = nextSlideIndex * width - normalize(offsetSize)
      ref.current && ref.current.scrollToOffset({offset})
      setCurrentSlideIndicator(nextSlideIndex)
    } else {
      navigation.navigate('LoginScreen')
    }
  }

  const onPreviousSlide = () => {
    const previousSlideIndex: number = currentSlideIndicator - 1
    if (currentSlideIndicator != 0) {
      const offset: number = previousSlideIndex * width - normalize(offsetSize)
      ref.current && ref.current.scrollToOffset({offset})
      setCurrentSlideIndicator(previousSlideIndex)
    }
  }

  const onSkip = () => {
    navigation.navigate('LoginScreen')
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.onboardingWrapper}>
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
      </View>
    </SafeAreaView>
  )
}

export default OnboardingScreen
