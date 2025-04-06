'use client';
import { Suspense } from 'react';
import products from '@/data/products_1.json';
import { CardProduct } from '@/components/shared/CardProduct';

export default function Page() {
  return (
    <Suspense fallback={<>Loading</>}>
      <div className='flex flex-row flex-wrap gap-2 px-8 max-w-7xl mb-5 w-full justify-between'>
        {products.products.map((product: any) => (
          <CardProduct className='w-[23%]' key={product.id} data={product} />
        ))}
      </div>
    </Suspense>
  );
}
