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
import { useReviewData } from "@/hooks/useReviewData";
import { removeData } from "@/utils/nukstorage";
import { router, useLocalSearchParams } from "expo-router";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";

export default function ReviewEditor() {
  const { id } = useLocalSearchParams();
  const reviewId = Array.isArray(id) ? id[0] : id;
  const { colors } = useTheme();
  const { artists, loading: artistsLoading } = useArtists();
  const artistOptions = artists.map(a => ({ value: a, label: a }));


  const {
    loading,
    title,
    rating,
    artist,
    comments,
    albumCover,
    setTitle,
    setRating,
    setArtist,
    setComments,
    setAlbumCover,
    save,
  } = useReviewData(reviewId as string);

  const captureData = async () => {
    await save();
    alert("Review saved!");
    router.back();
  };

  const deleteReview = async () => {
    const confirmed = await getConfirmation(
      "This action cannot be undone!"
    );
    if (confirmed && reviewId) {
      await removeData(reviewId);
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
        <PressableTitle onPress={()=>router.back()}
          text={title || "Review Editor"}
          size={32}
          marginBottom={20}
        />

        <ImagePicker
          value={albumCover}
          onImageChange={setAlbumCover}
          type="album"
        />

        {/* Title */}
        <View style={styles.label}>
          <TitleText text="Title" />
        </View>
        <View style={styles.entryContainer}>
          <SingleLineEntry
            placeholder="Enter the album title..."
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Rating */}
        <View style={styles.label}>
          <TitleText text="Rating" />
        </View>
        <View style={styles.entryContainer}>
          <DigitEntry
            placeholder="Enter a score..."
            value={rating}
            onChangeText={setRating}
          />
        </View>

        {/* Artist */}
        <View style={styles.label}>
          <TitleText text="Artist" />
        </View>
        <View style={styles.entryContainer}>
            {artistsLoading ? (
                <ActivityIndicator size="small" color={colors.text} />
            ) : (
                <ThemeDropdown
                data={artistOptions}
                initialValue={artist}
                onChange={(selected) => setArtist(selected)}
                />
            )}
        </View>

        {/* Comments */}
        <View style={styles.label}>
          <TitleText text="Comments" />
        </View>
        <View style={[styles.entryContainer, { marginBottom: 40 }]}>
          <MultiLineEntry
            placeholder="Write your review..."
            value={comments}
            onChangeText={setComments}
          />
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <StandardButton
            text="Delete"
            onPress={deleteReview}
            backgroundColor="red"
          />
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
