import { useEffect, useState } from "react";
import axios from "axios";

const dummyUrls = [
  {
    _id: 1,
    originalUrl:
      "https://www.amazon.in/b/?_encoding=UTF8&_encoding=UTF8&node=205224204031&ref_=BAUWDIF&pd_rd_w=RHACa&content-id=amzn1.sym.8e0ce633-0dae-4149-88c0-9f5c1de39d3c&pf_rd_p=8e0ce633-0dae-4149-88c0-9f5c1de39d3c&pf_rd_r=9X4JAVHRSPE80XVRE1S8&pd_rd_wg=l9J3S&pd_rd_r=8a83ad68-ad35-408a-9a58-fc4f8782d22b",
    shortCode: "UkjgUY",
    clicks: 1,
  },
  {
    _id: 2,
    originalUrl:
      "https://www.amazon.in/b/?_encoding=UTF8&_encoding=UTF8&node=205224204031&ref_=BAUWDIF&pd_rd_w=RHACa&content-id=amzn1.sym.8e0ce633-0dae-4149-88c0-9f5c1de39d3c&pf_rd_p=8e0ce633-0dae-4149-88c0-9f5c1de39d3c&pf_rd_r=9X4JAVHRSPE80XVRE1S8&pd_rd_wg=l9J3S&pd_rd_r=8a83ad68-ad35-408a-9a58-fc4f8782d22b",
    shortCode: "UkjgUY",
    clicks: 2,
  },
  {
    _id: 3,
    originalUrl:
      "https://www.amazon.in/?&tag=googhydrabk1-21&ref=pd_sl_5szpgfto9i_e&adgrpid=155259813593&hvpone=&hvptwo=&hvadid=825671333270&hvpos=&hvnetw=g&hvrand=11831946498812373159&hvqmt=e&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9208149&hvtargid=kwd-64107830&hydadcr=14452_2479340&mcid=e9c68a2d0f333bcaacd29ec00843c329&hvocijid=11831946498812373159--&hvexpln=nav&gad_source=1",
    shortCode: "UkjtUY",
    clicks: 3,
  },
];

const App = () => {
  const [urls, setUrls] = useState(dummyUrls);
  const [inputValue, setInputValue] = useState("");

  async function fetchUrls() {
    const res = await axios.get("/api/url");
    setUrls(res.data.data.urls);
  }

  async function createShortUrl() {
    await axios.post("/api/url", {
      url: inputValue,
    });

    setInputValue("");
    await fetchUrls();
  }

  async function deleteUrl(id){
    await axios.delete(`/api/url/${id}`)
    await fetchUrls()
  }

  useEffect(() => {
    axios.get("/api/url").then((res) => {
      setUrls(res.data.data.urls);
    });
  }, []);

  return (
    <main className="p-10 flex flex-col">
      <div className="w-full max-w-4xl p-2 flex gap-2">
        <input
          className="border rounded w-full p-2"
          placeholder="Enter long Url"
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button
          className="rounded p-2 bg-orange-500 text-white cursor-pointer"
          onClick={createShortUrl}
        >
          Shorten
        </button>
      </div>
      <div className="w-full max-w-4xl p-2"></div>
      <div className="w-full max-w-4xl p-2 flex flex-col gap-2">
        {urls.map((url) => {
          return (
            <div
              key={url._id}
              className="border border-neutral-200 p-2 flex gap-4 justify-evenly items-center"
            >
              <a
                href={`http://localhost:3000/${url.shortCode}`}
                target="_blank"
              >
                {url.shortCode}
              </a>
              <p className="truncate">{url.originalUrl}</p>
              <p>{url.clicks}</p>
              <div className="flex gap-2">
                <button className="p-2 rounded bg-orange-500 text-white cursor-pointer">
                  Copy
                </button>
                <button className="p-2 rounded bg-orange-500 text-white cursor-pointer"
                onClick={() => deleteUrl(url._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default App;
