import React, { useContext, useState } from "react";
import { RestaurantInfo } from "../components/RestaurantInfo";
import { RestaurantList, Loading } from "./RestaurantScreen.styles";
import { Spacer } from "../../../components/spacer/spacerComponent";
import { SafeArea } from "../../../components/utility/SafeAreaComponent";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { Search } from "../components/SearchComponent";
import { TouchableOpacity } from "react-native";
import { FavouritesBar } from "../../../components/favourites/favouriteBarComponent";
import { FavouritesContext } from "../../../services/favourite/favouriteContext";
import { FadeInView } from "../../../components/animations/fadeAnimation";

export const RestaurantsScreen = ({ navigation }) => {
  // const restaurantContext = useContext(RestaurantsContext);
  const { isLoading, restaurants } = useContext(RestaurantsContext);
  const [isToggled, setIsToggled] = useState(false);
  const { favourites } = useContext(FavouritesContext);
  // console.log(error);
  // console.log(restaurantContext);
  return (
    <SafeArea>
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )}
      {isLoading && <Loading size={"large"} color="#D0421B" />}
      {!isLoading && (
        <RestaurantList
          data={restaurants}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RestaurantDetail", { restaurant: item })
              }
            >
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <RestaurantInfo restaurant={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.name}
        />
      )}
    </SafeArea>
  );
};
