import React, {useState} from 'react';
import {Modal, StyleSheet, Text, Pressable, View, ScrollView} from 'react-native';
import Button from '../button';
import {styles} from './styles';

type CProps = {
  setModalVisible: (value: boolean) => void;
  modalVisible: boolean;
  message: string;
};

const Modalka = (props: CProps) => {
  const {modalVisible, setModalVisible, message} = props;
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <ScrollView contentContainerStyle={styles.modalView}>
            <Text style={styles.modalText}>{message}</Text>
            <Button
              onPress={() => setModalVisible(false)}
              textStyle={styles.textStyle}
              title="Hide"
            />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default Modalka;
