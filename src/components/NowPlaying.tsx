import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";

interface SpotifyData {
  isPlaying: boolean;
  songUrl: string;
  albumImageUrl: string;
  title: string;
  artist: string;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const NowPlaying: React.FC = () => {
  // Use the correct type for the data and error
  const { data, error } = useSWR<SpotifyData, Error>("/api/spotify", fetcher);

  useEffect(() => {
    const interval = setInterval(() => {
      // Manually re-fetch data to check for updates
      mutate("/api/spotify");
    }, 25000);

    return () => clearInterval(interval);
  }, []);

  if (error) {
    return <p>Error fetching data. Please try again later.</p>;
  }

  // Show loading state while data is being fetched
  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {data.isPlaying ? (
        <a href={data.songUrl} target="_blank" rel="noopener noreferrer">
          <div className="bg-[#121212] w-full h-[60px] border-[2px] border-[#1ed760] rounded-xl px-2 flex gap-5 items-center">
            <div>
              <Image
                src={data.albumImageUrl}
                width={45}
                height={45}
                className="rounded-full"
                alt={`Album cover for ${data.title} by ${data.artist}`}
              />
            </div>
            <div>
              <p className="line-clamp-1">{data.title}</p>
              <p className="text-white opacity-[50%] text-base line-clamp-1">
                {data.artist}
              </p>
            </div>
          </div>
        </a>
      ) : (
        <div className="bg-[#121212] w-full h-[60px] border-[2px] border-[#1ed760] rounded-xl px-2">
          <div className="w-full h-full flex gap-5 items-center">
            <div>
              <Image
                src={`/spotify.png`}
                width={45}
                height={45}
                className="rounded-full"
                alt="Spotify Logo"
              />
            </div>
            <div>
              <p className="line-clamp-1">Not Listening</p>
              <p className="text-white opacity-[50%] text-base line-clamp-1">
                Currently, I'm offline
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NowPlaying;
