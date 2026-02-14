import { useEffect, useState } from "react";

function SurahSelect({ onSelect }) {
  const [surahs, setSurahs] = useState([]);

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then(res => res.json())
      .then(data => setSurahs(data.data));
  }, []);

  return (
    <div className="overflow-y-auto flex flex-col justify-center p-3 w-full max-h-full">
      <div className="space-y-3 w-full mx-auto">
        {surahs.map((surah, index) => (
          <div
            key={surah.number}
            onClick={() => onSelect(surah.number)}
            className={`p-4 rounded-xl cursor-pointer transition 
              ${index % 2 === 0 ? "bg-white" : "bg-green-50"}
              hover:bg-green-200 hover:scale-[1.01]`}
          >
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-green-900">
                {surah.name}
              </span>

              <span className="text-green-700">
                {surah.number}. {surah.englishName}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default SurahSelect;