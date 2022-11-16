/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import {Routes, Route} from 'react-router-dom'
import { fetchCategoriesStart } from '../../store/categories/categories.action';
// import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import "./shop.styles.scss";
import {useDispatch} from 'react-redux';
import { checkUserSession } from '../../store/user/user.action';

const Shop = () => {

  const dispatch = useDispatch()

 
  useEffect(() => {
    dispatch(checkUserSession());
  }, []);


  useEffect( () => {
        dispatch(fetchCategoriesStart());
},[]);

  return (
    <Routes>
        <Route index element={<CategoriesPreview />} />
        <Route path=':category' element={<Category />} />

    </Routes>
  );
};

export default Shop;
