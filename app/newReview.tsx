import DigitEntry from "@/components/DigitEntry";
import ImagePicker from "@/components/ImagePicker";
import MultiLineEntry from "@/components/MultiLineEntry";
import PressableTitle from "@/components/PressableTitle";
import SingleLineEntry from "@/components/SingleLineEntry";
import StandardButton from "@/components/StandardButton";
import ThemeDropdown from "@/components/ThemeDropdown";
import TitleText from "@/components/TitleText";
import { useTheme } from "@/contexts/ThemeContext";
import { useArtists } from "@/hooks/useArtists";
import { saveData } from "@/utils/nukstorage";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";


export default function Index() {
  const [id, setId] = useState("None")
  const [title, setTitle] = useState("")
  const [rating, setRating] = useState("")
  const [artist, setArtist] = useState("")
  const [comments, setComments] = useState("")
  const [albumCover, setAlbumCover] = useState<string | null>(null);
  const { colors } = useTheme();
  const { artists, loading } = useArtists();
  const artistOptions = artists.map(a => ({value: a, label: a}));

  const captureData = () => {
    const date = new Date()
    const data = { id, title, rating, artist, comments, date, albumCover, type: "album" };
    saveData(data)
    alert("Review saved!")
    router.back()
  }

  const cancel = async() => {
    const confirmed = await getConfirmation("This review will not be saved!");
    if (confirmed) router.back();
  }

  /*
    const deleteReview = async() => {
        const confirmed = await getConfirmation("Are you sure you want to delete this review? This is a destructive action!");
        if(confirmed) removeData(id);
    };

    const deleteAllReviews = async() => {
        const confirmed = await getConfirmation("Are you sure you want to delete ALL reviews? This is a destructive action!");
        if(confirmed) removeAllReviews();
    };
  */

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
      <ScrollView style={{ backgroundColor: colors.background}}>
      <View style={{
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        paddingHorizontal: 0,
      }}>
        <View style={{ width: "100%", alignItems: "center", marginTop: 80, paddingHorizontal: 20}}>
            <PressableTitle onPress={()=>router.back()} text="New Review" size={32} marginBottom={20}></PressableTitle>
            <ImagePicker value={albumCover} onImageChange={setAlbumCover} type="album"/>
        </View>

        <View style={styles.label}>
            <TitleText text="Title"></TitleText>
        </View>
        <View style={styles.entryContainer}>
            <SingleLineEntry placeholder="Enter the album title..." value={title} onChangeText={setTitle}></SingleLineEntry>
        </View>

        <View style={styles.label}>
            <TitleText text="Rating"></TitleText>
        </View>
        <View style={styles.entryContainer}>
            <DigitEntry placeholder="Give a score..." value={rating} onChangeText={setRating}></DigitEntry>
        </View>

        <View style={styles.label}>
            <TitleText text="Artist"></TitleText>
        </View>
        <View style={styles.entryContainer}>
            <ThemeDropdown
                data={artistOptions}
                initialValue={artist}
                onChange={(selected) => setArtist(selected)}
            />
        </View>

        <View style={styles.label}>
            <TitleText text="Comments"></TitleText>
        </View>
        <View style={styles.entryContainer}>
            <MultiLineEntry placeholder="Leave your review..." value={comments} onChangeText={setComments}></MultiLineEntry>
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