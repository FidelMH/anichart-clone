 'use client'
import Link from 'next/link';
import {getAnimeListBySeason} from '../lib/actions';
import Image from 'next/image';
import { FaceSmileIcon, HeartIcon } from '@heroicons/react/24/outline';




function AnimeCard() {
    const { loading, error, data } = getAnimeListBySeason("WINTER", 2025);
    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;
    const animeList = data?.Page?.media;
    // console.log(animeList[1].coverImage.color);
    // console.log(animeList[1].genres);
    const anime = animeList[2];
    const studios = getNamesOfAnimationStudio(anime);
    let animeRelation = getAnimeRelation(anime);
    let animeSource = anime.source.split('_').map(word => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1)).join(' ');
    let sourceComp="";
    if(animeRelation) {
        sourceComp = "Sequel to "+animeRelation.title;
        

    }
    else{
        sourceComp = 'Source: '+animeSource;
    }


    return(
        <div className=' flex  shadow hover:shadow-lg duration-100 rounded-sm w-[460px] h-[265px]'>
            <div className='relative cursor-pointer'>
                <div className=' '>

                    <Image className='h-[265px] max-w-[185px]' alt={`${anime.title.romaji} Cover Image`} src={anime.coverImage.large} width={185} height={265} />
                </div>
                <div className='w-full flex flex-col space-y-1 p-2 absolute bottom-0 bg-slate-800 bg-opacity-70 text-xs '>
                    <a className='block text-white font-bold hover:text-rose-300 duration-100 ' href={anime.siteUrl}>{anime.title.romaji}</a>
                    
                    <div className=''>
                        {
                            studios.map((studio, index) => {
                                return <a href={studio.siteUrl} key={index} className='text-rose-300 font-semibold inline text-xs'>{index==studios.length-1?studio.name:studio.name+', '}</a>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='flex flex-col w-full p-3'>
                <div className='flex justify-between items-center  '>
                    <div className='flex flex-col space-y-1'>
                        <div className='text-gray-500 text-xs font-medium '>Ep {anime.nextAiringEpisode.episode} of {anime.episodes} airing in</div>
                        <div className='font-semibold text-base'>4 days, 5 hours</div>
                        <div className='text-xs font-medium'>{sourceComp}</div>
                        

                    </div>
                    <div className='text-gray-500 text-xs'>
                        <div className='flex space-x-1 items-center mb-2'><FaceSmileIcon className='size-5 text-lime-500' /><span className='block '>{anime.averageScore}%</span></div>
                        <div className='flex space-x-1 items-center'>
                            <HeartIcon className='size-5 text-red-500' />
                            <span className='block'>#{anime.rankings[3].rank}</span>
                        </div>
                        
                    </div>
                </div>
                <div className='text-[11px]'>{anime.description.replace(/<[^>]*>?/gm, '')}</div>
                <div>text</div>
            </div>
            

        </div>
        )
}

export default function AnimeCardWrapper(){
    
    return <AnimeCard />
}//460 265

function getNamesOfAnimationStudio(anime){
    const studios = anime.studios.nodes;
    const animationStudios = studios.filter(studio => studio.isAnimationStudio);
    return [... new Set(animationStudios.map(studio => studio))];
}

function getAnimeRelation(anime){
    const sources = anime.relations.edges.map((edge,index) => {
        return{
            relationType: edge.relationType,
            title: anime.relations.nodes[index].title.romaji}
    })

    
    let prequel = sources.find(source => source.relationType === 'PREQUEL')
    if(prequel) return prequel

    
    return null;


}