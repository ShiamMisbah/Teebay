import { useQuery } from '@apollo/client';
import React from 'react'
import { GET_BORROWED_PRODUCTS } from '../queries/rentProductQueries';
import { useAuthContext } from '../context/AuthContext';
import ActionProductCard from './ActionProductCard';

const BorrowedData = () => {
    const { authUser } = useAuthContext();
    const {
      data: borrowedData,
      loading: borrowedLoading,
      error: borrowedError,
    } = useQuery(GET_BORROWED_PRODUCTS, {
      variables: { rentedUserId: Number(authUser.id) },
    });

    if (borrowedLoading) {
    return <div>...Loading</div>;
    }
    if (borrowedError) {
    return <div>{borrowedError.message}</div>;
    }

    return (
      <div>
        {borrowedData &&
          borrowedData.getUserBorrowedProducts &&
          borrowedData.getUserBorrowedProducts.map((product) => (
            <ActionProductCard
              key={product.id}
              productData={product}
              isBuy={false}
            />
          ))}
        {borrowedData && borrowedData.getUserBorrowedProducts.length < 1 && (
          <h1>No products Found</h1>
        )}
      </div>
    );
}

export default BorrowedData