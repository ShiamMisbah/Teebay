import React from 'react'
import { GET_SOLD_PRODUCTS } from '../queries/buyProductQueries';
import { useQuery } from '@apollo/client';
import { useAuthContext } from '../context/AuthContext';
import ActionProductCard from './ActionProductCard';

const SoldData = () => {
    const { authUser } = useAuthContext();
    const {
      data: soldData,
      loading: soldLoading,
      error: soldError,
    } = useQuery(GET_SOLD_PRODUCTS, {
      variables: { originalUserId: Number(authUser.id) },
    });

    if (soldLoading) {
      return <div>...Loading</div>;
    }
    if (soldError) {
      return <div>{soldError.message}</div>;
    }

    return (
      <div>
        {soldData &&
          soldData.getUserSoldProducts &&
          soldData.getUserSoldProducts.map((product) => (
            <ActionProductCard
              key={product.id}
              productData={product}
              isBuy={true}
            />
          ))}
          {soldData &&
          soldData.getUserSoldProducts.length <1 && 
            (
                <h1>No products Found</h1>
            )
          }
      </div>
    );
}

export default SoldData