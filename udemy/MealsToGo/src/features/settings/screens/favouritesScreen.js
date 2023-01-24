import React, { useContext } from "react";
import { FavouritesContext } from "../../../services/favourite/favouriteContext";
import { RestaurantInfo } from "../../restaurants/components/RestaurantInfo";
import { RestaurantList } from "../../restaurants/screens/RestaurantScreen.styles";
import { Text } from "../../../components/typography/textComponent";
import { Spacer } from "../../../components/spacer/spacerComponent";
import { TouchableOpacity } from "react-native";
import { SafeArea } from "../../../components/utility/SafeAreaComponent";
import styled from "styled-components";

const NoFavouritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;

export const FavouritesScreen = ({ navigation }) => {
  const { favourites } = useContext(FavouritesContext);

  return favourites.length ? (
    <SafeArea>
      <RestaurantList
        data={favourites}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("RestaurantDetail", { restaurant: item })
            }
          >
            <Spacer position="bottom" size="large">
              <RestaurantInfo restaurant={item} />
            </Spacer>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  ) : (
    <NoFavouritesArea>
      <Text> No favourites yet</Text>
    </NoFavouritesArea>
  );
};
