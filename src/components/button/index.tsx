import React from 'react';
import {Text, Pressable, StyleSheet, Image} from 'react-native';
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
    title: string = '',
    onPress = () => {},
    textStyle = styles.buttonText,
    imageStyle = {},
    style = styles.button,
    image = null,
  } = props;

  return (
    <Pressable style={style} onPress={onPress}>
      {image ? (
        <Image style = {imageStyle} source={{uri: image}} />
      ) : (
        <Text style={textStyle}>{props.title}</Text>
      )}
    </Pressable>
  );
};

export default Button;
