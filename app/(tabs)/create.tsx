import IconButton from "@/components/IconButton";
import TitleText from "@/components/TitleText";
import { useTheme } from "@/contexts/ThemeContext";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from "expo-router";
import { ScrollView, View } from "react-native";

export default function Create() {
  const { colors } = useTheme();
  return (
    <ScrollView style={{backgroundColor: colors.background}}> 
      <View style={{marginTop: 80, paddingHorizontal: 20}}>
        <TitleText text="Create" size={32} marginBottom={8}></TitleText>
        <View style={styles.buttonContainer}>
            <IconButton text="Artist" onClick={()=> router.push("../newArtist")} icon={<MaterialCommunityIcons name="microphone-variant" size={44} color={colors.text} />}></IconButton>
            <IconButton text="Review" onClick={()=> router.push("../newReview")} icon={<Ionicons name="disc" size={44} color={colors.text} />}></IconButton>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = {
    buttonContainer: {
        paddingHorizontal: 16
    }
}