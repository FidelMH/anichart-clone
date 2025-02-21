import {gql, useQuery} from '@apollo/client';

export function getAnimeListBySeason(season, year) {
  const GET_ANIME_LIST = gql`
    query ($season: MediaSeason, $seasonYear: Int,$sort: [MediaSort] = [ SCORE_DESC],$isAdult: Boolean = true) {
      Page {
        media(season: $season, seasonYear: $seasonYear, type: ANIME,sort: $sort, isAdult: $isAdult) {
          id
          title {
            romaji
            english
            native
          }
          coverImage  {
            medium
            large
            color
          }
          genres
          
        }
      }
    }
  `;

  const variables = {
    season:season,
    seasonYear: parseInt(year),
  };

  return useQuery(GET_ANIME_LIST, {variables:variables});
}