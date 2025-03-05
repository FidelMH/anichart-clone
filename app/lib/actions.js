import {gql, useQuery} from '@apollo/client';

export function getAnimeListBySeason(season, year,isAdult) {

  // 
  const GET_ANIME_LIST = gql`
    query ($format:MediaFormat,$isAdult: Boolean,$season: MediaSeason,$seasonYear: Int,$sort: [MediaSort]= [ SCORE_DESC],) {
	Page {
	media (, type: ANIME,format: $format,isAdult: $isAdult,season: $season,seasonYear: $seasonYear,sort: $sort) {
		id
		title {
			romaji
			english
			native
		}
		genres
    siteUrl
		studios {
			nodes {
				isAnimationStudio
				name
				id
        siteUrl
			}
		}
		format
		status	
		description
		startDate{
			year
			month
			day
		}
		endDate {
			year
			month
			day
		}
  episodes
  favourites
  nextAiringEpisode {
    timeUntilAiring
    episode
  }
  rankings {
    rank
    allTime
    context
    id
    type
  }
  trailer {
    thumbnail
    site
  }
  source
  externalLinks {
    id
    icon
    site
  }
  relations {
    edges {
      relationType
    }
    nodes {
      title {
        romaji
      }
  }
  }
  coverImage {
    color
    extraLarge
    large
    medium
  }
  averageScore
}
  
    
  
}
 
}
  `;

  const variables = {
    season:season,
    seasonYear: parseInt(year),
     format: "TV",
      isAdult: isAdult
  };

  return useQuery(GET_ANIME_LIST, {variables:variables});
}