import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { Dimensions, View } from "react-native";
import { BarChart } from "react-native-chart-kit";

type Props = {
  stats: {
    ten: number;
    eightnine: number;
    sixseven: number;
    fourfive: number;
    twothree: number;
    one: number;
  };
};

export default function ThemeBarChart({ stats }: Props) {
  const { colors } = useTheme();
  const screenWidth = Dimensions.get("window").width - 30;

  const data = {
    labels: ["10", "8+", "6+", "4+", "2+", "< 2"],
    datasets: [
      {
        data: [
          stats.ten || 0,
          stats.eightnine || 0,
          stats.sixseven || 0,
          stats.fourfive || 0,
          stats.twothree || 0,
          stats.one || 0,
        ],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => colors.text,
    barPercentage: 0.7,
  };

  return (
    <View>
      <BarChart
        style={{ paddingLeft: 15, paddingRight: 10, borderRadius: 16 }}
        data={data}
        width={screenWidth - 20}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={chartConfig}
        verticalLabelRotation={0}
        showValuesOnTopOfBars
        fromZero
      />
    </View>
  );
}
