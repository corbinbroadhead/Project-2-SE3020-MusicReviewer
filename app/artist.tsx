import BasicAlbumCard from "@/components/BasicAlbumCard";
import DigitEntry from "@/components/DigitEntry";
import ImagePicker from "@/components/ImagePicker";
import MultiLineEntry from "@/components/MultiLineEntry";
import PressableTitle from "@/components/PressableTitle";
import StandardButton from "@/components/StandardButton";
import TitleText from "@/components/TitleText";
import { useTheme } from "@/contexts/ThemeContext";
import { useArtistData } from "@/hooks/useArtistData";
import { getAllReviewsByArtist, removeData } from "@/utils/nukstorage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ArtistEditor() {
  const { id } = useLocalSearchParams();
  const [reviews, setReviews] = useState<string[]>([]);
  const artistId = Array.isArray(id) ? id[0] : id;
  const { colors } = useTheme();

  const { loading, rating, comments, image, setRating, setComments, setImage, save } = useArtistData(artistId as string);

  const fetchData = async () => {
    const [allReviewData] = await Promise.all([
      getAllReviewsByArtist(artistId),
    ]);
    setReviews(allReviewData || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const captureData = async () => {
    await save();
    alert("Artist saved!");
    router.back();
  };

  const deleteArtist = async () => {
    const confirmed = await getConfirmation(
      "Are you sure you want to delete this artist? This action cannot be undone!"
    );
    if (confirmed && artistId) {
      await removeData(artistId);
      router.back();
    }
  };

  const getConfirmation = (message: string) =>
    new Promise<boolean>((resolve) => {
      Alert.alert(
        "Are you sure?",
        message,
        [
          { text: "Cancel", onPress: () => resolve(false) },
          { text: "Confirm", onPress: () => resolve(true) },
        ],
        { cancelable: false }
      );
    });

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.text} />
      </View>
    );

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <View style={styles.container}>
        <PressableTitle onPress={()=>router.back()} text={artistId || "Artist Editor"} size={32} marginBottom={20} />

        <ImagePicker value={image} onImageChange={setImage} type="other" />

        {/* Rating */}
        <View style={styles.label}>
          <TitleText text="Rating" />
        </View>
        <View style={styles.entryContainer}>
          <DigitEntry
            placeholder="Enter a rating..."
            value={rating}
            onChangeText={setRating}
          />
        </View>

        {/* Comments */}
        <View style={styles.label}>
          <TitleText text="Comments" />
        </View>
        <View style={[styles.entryContainer, { marginBottom: 30 }]}>
          <MultiLineEntry
            placeholder="Enter your thoughts..."
            value={comments}
            onChangeText={setComments}
          />
        </View>

        {/* Albums Reviewed */}
        <TitleText text="Albums Reviewed" size={20} marginBottom={10} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {reviews.length ? (
            reviews.map((id, i) => <BasicAlbumCard key={i} id={String(id)} />)
          ) : (
            <Text style={{ marginLeft: 10, color: colors.text }}>
              No album reviews found.
            </Text>
          )}
        </ScrollView>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <StandardButton text="Delete" onPress={deleteArtist} backgroundColor="red" textColor="white" />
          <StandardButton text="Save" onPress={captureData} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    marginTop: 80,
    paddingHorizontal: 20,
  },
  label: {
    width: "90%",
    textAlign: "left",
    marginLeft: 34,
    marginBottom: 6,
  },
  entryContainer: {
    width: "90%",
    marginBottom: 12,
  },
  horizontalScroll: {
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: "40%",
    maxWidth: 500,
    marginTop: 10,
    marginBottom: 50,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
