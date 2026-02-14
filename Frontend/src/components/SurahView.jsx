import { useEffect, useState } from "react";

function SurahView({ surahView }) {
  const [surah, setSurah] = useState();

  useEffect(() => {
    if (!surahView) return;
    setSurah(surahView.data);
  }, [surahView]);

  if (!surah) return null;

  const showBismillah = surah.number !== (9 && 1);

  return (
    <div
      className="w-full text-right font-serif"
      style={{ direction: "rtl", fontFamily: "'Scheherazade New', serif" }}
    >

      <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl text-center text-green-800 font-bold mb-6 p-4 rounded-xl border border-green-800">
        {surah.name} - {surah.englishName}
      </h1>

      {showBismillah && (
        <p className="text-lg sm:text-xl md:text-3xl lg:text-4xl text-center text-green-700 font-bold my-6">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </p>
      )}

      <p className="text-base sm:text-lg md:text-3xl lg:text-3xl sm:leading-loose lg:leading-loose md:leading-loose md:px-5 px-3" style={{ textAlign: "justify", direction: "rtl" }}>
        {surah.ayahs.map((ayah, index) => {
          let text = ayah.text;
          if (index === 0 && text.startsWith("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ")) {
            text = text.replace("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", "").trim();
          }
          return (
            <span key={ayah.number}>
              {text}<span
                key={ayah.number}
                className="mr-2 inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-green-200 text-green-800 font-semibold rounded-full"
              >
                {ayah.numberInSurah}
              </span>
              {" "}
            </span>
          );
        })}
      </p>

      <p className="text-lg sm:text-xl md:text-3xl lg:text-4xl text-center text-green-700 font-bold my-6">
        صدق الله العظيم
      </p>
    </div>
  );
}

export default SurahView;
