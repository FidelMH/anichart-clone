 'use client'
import Link from 'next/link';
import {getAnimeListBySeason} from '../lib/actions';
import Image from 'next/image';




function AnimeCard() {
    const { loading, error, data } = getAnimeListBySeason("WINTER", 2025);
    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;
    const animeList = data?.Page?.media;
    console.log(animeList[1].coverImage.color);
    console.log(animeList[1].genres);
    return(
        <div className=' flex border shadow hover:shadow-lg duration-100'>
            <div className='relative cursor-pointer'>
                <div className=' '>

                    <Image alt={`${animeList[1].title.romaji} Cover Image`} src={animeList[1].coverImage.large} width={185} height={265} />
                </div>
                <div className='w-full flex flex-col space-y-1 absolute bottom-0 bg-slate-800 bg-opacity-70 text-xs p-2'>
                    <Link className='block text-white font-bold hover:text-rose-300 duration-100 ' href={`/anime/${animeList[1].id}`}>{animeList[1].title.romaji}</Link>
                    <Link className="text-rose-300 font-semibold text" href={'/studio'}>Studio</Link>
                </div>
            </div>
            <div>

            </div>
            

        </div>
        )
}

export default function AnimeCardWrapper(){
    return <AnimeCard />
}//460 265