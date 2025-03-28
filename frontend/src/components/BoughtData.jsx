import { useQuery } from '@apollo/client';
import React from 'react'
import { GET_BOUGHT_PRODUCTS } from '../queries/buyProductQueries';
import { useAuthContext } from '../context/AuthContext';
import ActionProductCard from './ActionProductCard';

const BoughtData = () => {
    const { authUser } = useAuthContext();
    const {
      data: boughtData,
      loading: boughtLoading,
      error: boughtError,
    } = useQuery(GET_BOUGHT_PRODUCTS, {
      variables: { boughtUserId: Number(authUser.id) },
    });

    if (boughtLoading) {
      return <div>...Loading</div>;
    }
    if (boughtError) {
      return <div>{boughtError.message}</div>;
    }

    return (
      <div>
        {boughtData &&
          boughtData.getUserBoughtProducts &&
          boughtData.getUserBoughtProducts.map((product) => (
            <ActionProductCard key={product.id} productData={product} isBuy={true} />
          ))}
      </div>
    );
}

export default BoughtData