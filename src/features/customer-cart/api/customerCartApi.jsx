import { useMutation, useQuery } from "@tanstack/react-query";

import axiosClient from "@/shared/api/axiosClient";



const GetCartByUserId = async() => {
    const uri = "https://localhost:7279/api/Cart";
    const response = await axiosClient.get(`${uri}`);
    return response.data;
}
export const GetCartByUserIdQuery = () =>{
    const query = useQuery({
        queryKey: ["user-cart"],
        queryFn: () =>{
            return GetCartByUserId();
        }
    })
    return query;
}

export const UpdateCartById = async (cartId,quanity) =>{
    const uri = `https://localhost:7279/api/Cart?cartId=${cartId}&quanity=${quanity}`;
    const response = await axiosClient.put(`${uri}`);
    return response.data
}

export const UpdateCartByIdRequest = () =>{
    const mutation = useMutation({
        mutationFn:UpdateCartById
    })
    return mutation;
}

export const DeleteCartById = async (payload) =>{
    console.log(payload)
    const response = await axiosClient.delete(`Cart`,{params:{cartId: payload.cartId}})
    return response.data;
}

export const DeleteCartByIdMutation = () =>{
    const mutation = useMutation({
        mutationFn: DeleteCartById
    })
    return mutation
}

export const GetTotalAmountByCartsId = async(cartsId) =>{    
    const response = await axiosClient.post(`Cart/TotalAmount`,cartsId)
    return response.data;
}

export const GetTotalAmountByCartsIdRequest = () =>{
    const mutation = useMutation({
        mutationFn: GetTotalAmountByCartsId,
    })
    return mutation
}