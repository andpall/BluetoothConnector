import React from 'react';
import {
  Text,
  Pressable,
  Image,
} from 'react-native';
import styles from './styles';

interface Props {
  title?: string | null;
  onPress?: () => void;
  imageStyle?: any;
  textStyle?: any;
  style?: any;
  image?: string | null;
}

const Button = (props: Props) => {
  const {
    title = '',
    onPress = () => {},
    textStyle = styles.buttonText,
    imageStyle = {},
    style = styles.button,
    image = null,
  } = props;

  return (
    <Pressable style={{...styles.button, ...style}} onPress={onPress}>
      {image ? (
        <Image style={imageStyle} source={{uri: image}} />
      ) : (
        <Text style={{...styles.buttonText, ...textStyle}}>{title}</Text>
      )}
    </Pressable>
  );
};

export default Button;
