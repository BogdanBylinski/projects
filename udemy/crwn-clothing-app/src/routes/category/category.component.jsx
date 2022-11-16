import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";
// import { CategoriesContext } from "../../contexts/categories.context";
import { selectCategoriesIsLoading, selectCategoriesMap } from "../../store/categories/categories.selector";
import "./category.style.scss";


const Category = () => {
  const { category } = useParams();
  // const { categoriesMap } = useContext(CategoriesContext);
  const categoriesMap = useSelector(selectCategoriesMap)
  const [products, setProducts] = useState([]);
  const isLoading = useSelector(selectCategoriesIsLoading);



  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);


  



  return (
    <>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      {
        isLoading ? <Spinner />  : <div className="category-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
      </div>
      }


      
    </>
  );
};

export default Category;
