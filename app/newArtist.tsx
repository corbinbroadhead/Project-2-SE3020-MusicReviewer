import DigitEntry from "@/components/DigitEntry";
import ImagePicker from "@/components/ImagePicker";
import MultiLineEntry from "@/components/MultiLineEntry";
import PressableTitle from "@/components/PressableTitle";
import SingleLineEntry from "@/components/SingleLineEntry";
import StandardButton from "@/components/StandardButton";
import TitleText from "@/components/TitleText";
import { useTheme } from "@/contexts/ThemeContext";
import { saveData } from "@/utils/nukstorage";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";

export default function NewArtist() {
  const [id, setId] = useState("");
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const { colors } = useTheme();

  const captureData = () => {
    const date = new Date();
    const data = { id, rating, comments, date, image, type: "artist", albums: [] };
    saveData(data);
    alert("Artist saved!");
    router.back();
  };

  const cancel = async() => {
    const confirmed = await getConfirmation("This artist will not be saved!");
    if (confirmed) router.back();
  }

  const getConfirmation = (message: string) => new Promise<boolean>((resolve)=>{
    Alert.alert(
        "Are you sure?",
        message,
        [
        { text: "Cancel", onPress: () => resolve(false) },
        { text: "Confirm", onPress: () => resolve(true) }
        ],
        { cancelable: false }
    );
  });


  return (
    <ScrollView style={{backgroundColor: colors.background}}>
      <View style={{ flexGrow: 1, alignItems: "center", justifyContent: "flex-start", width: "100%", paddingHorizontal: 0 }}>
        <View style={{ width: "100%", alignItems: "center", marginTop: 80, paddingHorizontal: 20}}>
            <PressableTitle onPress={()=>router.back()} text="New Artist" size={32} marginBottom={20}></PressableTitle>
            <ImagePicker value={image} onImageChange={setImage} type="other" />
        </View>

        <View style={styles.label}>
            <TitleText text="Name"></TitleText>
        </View>
        <View style={styles.entryContainer}>
            <SingleLineEntry placeholder="Enter the artist's name..." value={id} onChangeText={setId} />
        </View>

        <View style={styles.label}>
            <TitleText text="Rating"></TitleText>
        </View>
        <View style={styles.entryContainer}>
            <DigitEntry placeholder="Give a score..." value={rating} onChangeText={setRating} />
        </View>

        <View style={styles.label}>
            <TitleText text="Comments"></TitleText>
        </View>
        <View style={[styles.entryContainer, {marginBottom: 40}]}>
            <MultiLineEntry placeholder="Leave your review..." value={comments} onChangeText={setComments} />
        </View>

        <View style={styles.buttonContainer}>
            <StandardButton text="Cancel" onPress={cancel} backgroundColor="red" />
            <StandardButton text="Save" onPress={captureData} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = {
  entryContainer: {width: "90%", marginBottom: 12},
  label: {
    width: "90%",
    textAlign: "left",
    marginLeft: 34,
    marginBottom: 6,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: "40%",
    maxWidth: 500,
    marginTop: 10,
  },
};
