import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const cores = [
  "#FFFFFF", // branco
  "#FFE135", // amarelo
  "#FF8C00", // laranja
  "#E32636", // vermelho
  "#FF69B4", // rosa
  "#8A2BE2", // violeta
  "#1F3FBF", // azul escuro
  "#4FB3E8", // azul claro
  "#1E8B3A", // verde escuro
  "#7FD13B", // verde claro
  "#8B4513", // marrom
  "#000000", // preto
];
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Pixel</Text>
    </View>
  );
  <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
  {cores.map((cor) => (
    <TouchableOpacity
      key={cor}
      style={{
        width: width / 6,
        height: width / 6,
        backgroundColor: cor,
      }}
    />
  ))}
</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
