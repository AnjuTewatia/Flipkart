import ImagePicker from 'react-native-image-crop-picker';

const pickImage = async camera => {
  try {
    let image = null;
    if (camera) {
      image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });
    } else {
      image = await ImagePicker.openPicker({
        // width: 300,
        // // height: 400,
        cropping: true,
      });
    }
    return image;
  } catch (error) {
    console.log('Error picking image:', error);
    return null;
  }
};

export default pickImage;
