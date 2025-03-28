import React from 'react'
import { useAuthContext } from '../context/AuthContext';
import { useQuery } from '@apollo/client';
import { GET_LENT_PRODUCTS } from '../queries/rentProductQueries';
import ActionProductCard from './ActionProductCard';

const LentData = () => {
    const { authUser } = useAuthContext();
    const {
      data: lentData,
      loading: lentLoading,
      error: lentError,
    } = useQuery(GET_LENT_PRODUCTS, {
      variables: { originalUserId: Number(authUser.id) },
    });

    if (lentLoading) {
    return <div>...Loading</div>;
    }
    if (lentError) {
    return <div>{lentError.message}</div>;
    }

    return (
      <div>
        {lentData &&
          lentData.getUserRentedProducts &&
          lentData.getUserRentedProducts.map((product) => (
            <ActionProductCard
              key={product.id}
              productData={product}
              isBuy={false}
            />
          ))}
        {lentData && lentData.getUserRentedProducts.length < 1 && (
          <h1>No products Found</h1>
        )}
      </div>
    );
}

export default LentData