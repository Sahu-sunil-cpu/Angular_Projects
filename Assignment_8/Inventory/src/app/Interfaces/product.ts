
export interface Product {
    _id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    imageUrl?: string;
    description?: string;
}

export interface ProductResponse {
    success: boolean;
    data: Product[];
}
