// import {  useContext } from "react";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";
import { selectCategoriesMap, selectCategoriesIsLoading} from "../../store/categories/categories.selector";
// import { CategoriesContext } from "../../contexts/categories.context";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap)
  // const { categoriesMap } = useContext(CategoriesContext);
  const isLoading = useSelector(selectCategoriesIsLoading);


  return (
    <> 
    {isLoading? <Spinner /> : 
      (Object.keys(categoriesMap).map((title) =>{
          const products = categoriesMap[title];
          return (
              <CategoryPreview key={title} title={title} products={products}></CategoryPreview>
          );
      } 
      )
      )
    }
    </>
  );
};

export default CategoriesPreview;
