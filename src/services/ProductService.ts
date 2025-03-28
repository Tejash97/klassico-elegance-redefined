
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  category_id: string;
  image_url: string | null;
  in_stock: boolean;
  featured: boolean;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
  // For UI display only, not in the database
  categoryName?: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching categories:', error);
    toast.error('Failed to load categories');
    return [];
  }
  
  return data || [];
};

export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories:category_id (name)
    `)
    .order('name');
  
  if (error) {
    console.error('Error fetching products:', error);
    toast.error('Failed to load products');
    return [];
  }
  
  return data.map(product => ({
    ...product,
    categoryName: product.categories?.name,
  })) || [];
};

export const getProductsByCategory = async (categorySlug: string): Promise<Product[]> => {
  const { data: categoryData } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single();

  if (!categoryData) {
    return [];
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryData.id)
    .order('name');
  
  if (error) {
    console.error('Error fetching products by category:', error);
    toast.error('Failed to load products');
    return [];
  }
  
  return data || [];
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories:category_id (name)
    `)
    .eq('featured', true)
    .order('name');
  
  if (error) {
    console.error('Error fetching featured products:', error);
    toast.error('Failed to load featured products');
    return [];
  }
  
  return data.map(product => ({
    ...product,
    categoryName: product.categories?.name,
  })) || [];
};

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories:category_id (name)
    `)
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }
  
  return data ? {
    ...data,
    categoryName: data.categories?.name,
  } : null;
};

export const createProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating product:', error);
    toast.error('Failed to create product');
    return null;
  }
  
  toast.success('Product created successfully');
  return data;
};

export const updateProduct = async (id: string, product: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating product:', error);
    toast.error('Failed to update product');
    return null;
  }
  
  toast.success('Product updated successfully');
  return data;
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting product:', error);
    toast.error('Failed to delete product');
    return false;
  }
  
  toast.success('Product deleted successfully');
  return true;
};

export const uploadProductImage = async (file: File, productId: string): Promise<string | null> => {
  const fileExt = file.name.split('.').pop();
  const filePath = `${productId}.${fileExt}`;
  
  const { error } = await supabase.storage
    .from('product-images')
    .upload(filePath, file, {
      upsert: true,
    });
  
  if (error) {
    console.error('Error uploading image:', error);
    toast.error('Failed to upload image');
    return null;
  }
  
  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath);
  
  return data.publicUrl;
};
