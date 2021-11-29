import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col, Button } from 'antd';
import axios from 'axios';

import Comments from './Sections/Comments'
import LikeDislikes from './Sections/LikeDislikes';
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE } from '../../Config'
import GridCards from '../../commons/GridCards';
import MainImage from '../../views/LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import Favorite from './Sections/Favorite';
function MovieDetailPage(props) {

    const movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [CommentLists, setCommentLists] = useState([])
    const [LoadingForMovie, setLoadingForMovie] = useState(true)
    const movieVariable = {
        movieId: movieId
    }

    useEffect(() => {

        let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
        fetchDetailInfo(endpointForMovieInfo)

        axios.post('/api/comment/getComments', movieVariable)
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    console.log('response.data.comments', response.data.comments)
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get comments Info')
                }
            })

    }, [])


    const fetchDetailInfo = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                console.log(result)
                setMovie(result)
                setLoadingForMovie(false)
            })
            .catch(error => console.error('Error:', error)
            )
    }

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

    return (
        <div>
            
            {!LoadingForMovie ?
                <MainImage
                    image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview}
                />
                :
                <div>loading...</div>
            }


           
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div>


                
                {!LoadingForMovie ?
                    <MovieInfo movie={Movie} />
                    :
                    <div>loading...</div>
                }

                <br />
             
                <br />

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LikeDislikes video videoId={movieId} userId={localStorage.getItem('userId')} />
                </div>

                
                <Comments movieTitle={Movie.original_title} CommentLists={CommentLists} postId={movieId} refreshFunction={updateComment} />

            </div>

        </div>
    )
}

export default MovieDetailPage

