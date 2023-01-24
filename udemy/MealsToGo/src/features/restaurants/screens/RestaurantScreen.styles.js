import { StatusBar, SafeAreaView, View, FlatList } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";

export const RestaurantScreenSafeArea = styled(SafeAreaView)`
  flex: 1;
  /* margin-top: ${StatusBar.currentHeight}px; */
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`}
`;
export const RestaurantSearch = styled(View)`
  padding: ${(props) => props.theme.space[3]};
`;
// export const RestaurantList = styled(View)`
//   flex: 1;
//   padding: ${(props) => props.theme.space[3]};
//   background-color: ${(props) => props.theme.colors.bg.primary};
// `;
export const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;
export const Loading = styled(ActivityIndicator)`
  flex: 1;
  justify-content: center;
`;
