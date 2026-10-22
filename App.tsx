
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRef, useState } from "react";
import * as Sharing from "expo-sharing";
import { captureRef } from "react-native-view-shot";

export default function App() {
  const { width } = Dimensions.get("window");

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

  const [corAtual, setCorAtual] = useState("#000000");
  const [pixels, setPixels] = useState<string[]>(
    Array(64).fill("#000000")
  );

  const gradeRef = useRef<View>(null);

  function pixelar(index: number) {
    const novosPixels = [...pixels];
    novosPixels[index] = corAtual;
    setPixels(novosPixels);
  }

  function limpar() {
    setPixels(Array(64).fill("#000000"));
  }

  async function compartilhar() {
    try {
      const disponivel = await Sharing.isAvailableAsync();

      if (!disponivel) {
        Alert.alert(
          "Ops!",
          "O compartilhamento não está disponível neste dispositivo."
        );
        return;
      }

      if (!gradeRef.current) {
        Alert.alert("Ops!", "Não foi possível encontrar o desenho.");
        return;
      }

      const uri = await captureRef(gradeRef, {
        format: "png",
        quality: 1,
      });

      await Sharing.shareAsync(uri, {
        mimeType: "image/png",
        dialogTitle: "Compartilhar desenho",
        UTI: "public.png",
      });
    } catch {
      Alert.alert(
        "Ops!",
        "Não foi possível compartilhar o desenho."
      );
    }
  }

  const tamanhoPixel = Math.floor((width - 32) / 8);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.titulo}>Pixel</Text>

      {/* Paleta de cores */}
      <View style={styles.paleta}>
        {cores.map((cor) => (
          <TouchableOpacity
            key={cor}
            style={{
              width: width / 6 - 8,
              height: width / 6 - 8,
              backgroundColor: cor,
              borderWidth: cor === corAtual ? 3 : 1,
              borderColor: "#777",
            }}
            onPress={() => setCorAtual(cor)}
          >
            <Text
              style={[
                styles.marcador,
                {
                  color: cor === "#000000" ? "#FFFFFF" : "#000000",
                },
              ]}
            >
              {cor === corAtual ? "X" : ""}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Cor selecionada */}
      <Text style={styles.textoCor}>
        Cor selecionada: {corAtual}
      </Text>

      {/* Grade de 8 x 8 pixels */}
      <View
        ref={gradeRef}
        collapsable={false}
        style={styles.grade}
      >
        {pixels.map((p, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => pixelar(index)}
            style={{
              width: tamanhoPixel,
              height: tamanhoPixel,
              backgroundColor: p,
              borderWidth: 0.5,
              borderColor: "#888",
            }}
          />
        ))}
      </View>

      {/* Botões */}
      <View style={styles.botoes}>
        <Button title="Limpar" onPress={limpar} />
        <Button
          title="Compartilhar"
          onPress={compartilhar}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 12,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
  },
  paleta: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 4,
  },
  marcador: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  textoCor: {
    fontSize: 14,
  },
  grade: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 1,
    borderColor: "#000",
  },
  botoes: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
});
