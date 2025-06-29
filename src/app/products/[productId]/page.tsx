import ProductClient from "./ProductClient";

interface ProductPageProps {
  params: {
  productId: string;
  };
  }

export default async function ProductPage({ params }: ProductPageProps) {
  const res = await fetch(`https://dummyjson.com/products/${params.productId}`);
  if (!res.ok) {
    return <div>Error loading product</div>;
  }
  const product = await res.json();

  return <ProductClient product={product} />;
}
