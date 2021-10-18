import { gql } from "@apollo/client";


export const ADD_SONG = gql`
mutation addSong($artist: String!, $title: String!, $thumbnail: String!, $url: String!, $duration: Float!) {
    insert_songs(objects: {artist: $artist, title: $title, thumbnail: $thumbnail, url: $url, duration: $duration}) {
      affected_rows
    }
  }
`

// export const ADD_OR_REMOVE_FROM_QUEUE = gql`
//     mutation addOrRemoveSongQueue($input: SongInput!) {
//         addOrRemoveSongQueue(input: $input) @client
//     }
// `

/*
{
  "artist": "dj poolboi",
  "title": "like we were the last two people on earth",
  "thumbnail": "https://i1.sndcdn.com/artworks-zrKkVoMVvSqy6KZH-KUhdyg-t500x500.jpg",
  "url": "https://soundcloud.com/djpoolboi/like-we-were-the-last-two-people-on-earth",
  "duration": 278
}
*/