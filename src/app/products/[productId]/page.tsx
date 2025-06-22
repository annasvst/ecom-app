import ProductClient from "./ProductClient";

export default async function ProductPage({ params }: any) {
  const res = await fetch(`https://dummyjson.com/products/${params.productId}`);
  if (!res.ok) {
    return <div>Error loading product</div>;
  }
  const product = await res.json();

  return <ProductClient product={product} />;
}
