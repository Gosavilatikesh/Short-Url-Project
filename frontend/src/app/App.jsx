import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const dummyUrls = [
  {
    _id: 1,
    originalUrl: "https://www.amazon.in/b/?_encoding=UTF8&_encoding=UTF8&node=205224204031&ref_=BAUWDIF&pd_rd_w=RHACa&content-id=amzn1.sym.8e0ce633-0dae-4149-88c0-9f5c1de39d3c&pf_rd_p=8e0ce633-0dae-4149-88c0-9f5c1de39d3c&pf_rd_r=9X4JAVHRSPE80XVRE1S8&pd_rd_wg=l9J3S&pd_rd_r=8a83ad68-ad35-408a-9a58-fc4f8782d22b",
    shortCode: "UkjgUY",
    clicks: 1
  },
  {
    _id: 2,
    originalUrl: "https://www.amazon.in/b/?_encoding=UTF8&_encoding=UTF8&node=205224204031&ref_=BAUWDIF&pd_rd_w=RHACa&content-id=amzn1.sym.8e0ce633-0dae-4149-88c0-9f5c1de39d3c&pf_rd_p=8e0ce633-0dae-4149-88c0-9f5c1de39d3c&pf_rd_r=9X4JAVHRSPE80XVRE1S8&pd_rd_wg=l9J3S&pd_rd_r=8a83ad68-ad35-408a-9a58-fc4f8782d22b",
    shortCode: "UkjgUY",
    clicks: 2
  },
  {
    _id: 3,
    originalUrl: "https://www.amazon.in/b/?_encoding=UTF8&_encoding=UTF8&node=205224204031&ref_=BAUWDIF&pd_rd_w=RHACa&content-id=amzn1.sym.8e0ce633-0dae-4149-88c0-9f5c1de39d3c&pf_rd_p=8e0ce633-0dae-4149-88c0-9f5c1de39d3c&pf_rd_r=9X4JAVHRSPE80XVRE1S8&pd_rd_wg=l9J3S&pd_rd_r=8a83ad68-ad35-408a-9a58-fc4f8782d22b",
    shortCode: "UkjgUY",
    clicks: 3
  }
]

const App = () => {

  const [urls, SetUrls] = useState(dummyUrls)
  const [inputValue, SetInputValue] = useState("")
  const [currentUrl, SetCurrentUrl] = useState(null)

  async function fetchUrls(){
    const res = await axios.get("http://localhost:3000/api/url")
  }

  return (
    <main className='p-10 flex flex-col'>
      <div className='w-full max-w-4xl p-2'></div>
      <div className='w-full max-w-4xl p-2'></div>
      <div className='w-full max-w-4xl p-2 flex flex-col gap-2'>
        {
          urls.map(url => {
            return (
              <div className='border border-neutral-200 p-2 flex gap-4 justify-evenly'>
                <p>{url.shortCode}</p>
                <p className='truncate'>{url.originalUrl}</p>
                <div className='flex gap-2'>
                  <button className='p-2 rounded bg-orange-500 text-white cursor-pointer'>Copy</button>
                  <button className='p-2 rounded bg-orange-500 text-white cursor-pointer'>Delete</button>
                </div>
              </div>
            )
          })
        }
      </div>
    </main>
  )
}

export default App
