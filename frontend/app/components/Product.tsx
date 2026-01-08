"use client";
import Link from 'next/link';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

interface ProductItem {
  id: number
  title: string
  price: number
  images: string[]
}

type ProductProp = {
  item: ProductItem
}

const Product = ({item} : ProductProp) => {
  
  return (
    <div className=' w-75 bg-white rounded-[15px] my-5'>
       <div className="container">
        <div>
          <Link href={`/product/${item.id}`}>
            <img  className=" flex justify-center items-center pb-4 p-4" src={item.images[0]} alt="img" />  
            </Link>
           <div className='flex items-center justify-between'>
              <div>
              <h3 className='title text-[20px]'>{item.title}</h3>
            <p className='text-[19px] font-bold'>${item.price}</p>
              <div className='text-yellow-400 flex items-center gap-2 py-3'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt  />
            </div>
           </div>
             <div className='bg-[#e71f41] py-2 px-4 rounded-md'>
             <h3 className='text-white font-semibold'>26%</h3>
            </div>
           </div>
        </div>
       </div>
    </div>
  )
}

export default Product
