import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { FormPage1, FormPage2, FormPage3, FormPage4, FormPage5 } from '../components/FormPages';
import { Box } from '@mui/material';
import { ADD_PRODUCTS } from '../queries/productQueries';
import { useMutation } from '@apollo/client';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});
    const { control, handleSubmit } = useForm();
    const [addProduct, { data, loading, error }] = useMutation(ADD_PRODUCTS);
    const { authUser } = useAuthContext()
    const navigate = useNavigate()
    
    const handleNext = (data) => {
      setFormData((prev) => ({ ...prev, ...data }));
      setStep((prev) => prev + 1);
    };

    const handleBack = () => {
      setStep((prev) => prev - 1);
    };

    const onSubmit = async (data) => {
        const finalData = { ...formData, ...data };
        finalData.price = Number(finalData.price)
        finalData.rent = Number(finalData.rent);
        finalData.userId = Number(authUser.id)
        try {
            await addProduct({
              variables: { input: finalData },
            });
            navigate('/myProduct')
            alert('Product Added')
        } catch (err) {
        console.error("Unexpected Error:", err.message);
        }
    };

    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        {step === 1 && (
          <FormPage1 control={control} onNext={handleSubmit(handleNext)} />
        )}
        {step === 2 && (
          <FormPage2
            control={control}
            onNext={handleSubmit(handleNext)}
            onBack={handleBack}
          />
        )}
        {step === 3 && (
          <FormPage3
            control={control}
            onNext={handleSubmit(handleNext)}
            onBack={handleBack}
          />
        )}
        {step === 4 && (
          <FormPage4
            control={control}
            onNext={handleSubmit(handleNext)}
            onBack={handleBack}
          />
        )}
        {step === 5 && (
          <FormPage5
            data={formData}
            control={control}
            onBack={handleBack}
            onSubmit={handleSubmit(onSubmit)}
          />
        )}
      </Box>
    );
}

export default ProductForm