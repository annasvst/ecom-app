import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
}

export default async function Home() {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    console.log(data);
    return (
      <main className=" py-4 pb-20">
        <h1 className="text-4xl font-bold text-center">
          All Products
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 mx-auto px-6 py-4 items-stretch">
          {data.products.map((product: Product) => (
            <Link key={product.id} href={`products/${product.id}`} passHref>
              <div
                key={product.id}
                className="rounded border-1 bg-sky-950 flex flex-col h-full"
              >
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="bg-white w-full"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-bold text-white">
                    {product.title}
                  </h2>
                  <p className="text-sm font-semibold text-amber-400 mt-auto">
                    {product.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    );
  } catch (error) {
    console.log(error);
  }
}
