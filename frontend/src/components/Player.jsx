import React, { useState, useEffect } from 'react'
import {getMovieById} from '../routes/movieRoutes'
import {getComments} from '../routes/commentRoute'
import '../css/reset.css'
import '../css/style.css'
import "../css/comments.css"
import angleSmallRight from "../icons/angle-small-right.png"
import thumbsUp from "../icons/thumbs-up.png"
import thumbsDown from "../icons/thumbs-down.png"
import commentIcon from "../icons/comment.png"
import avatar from "../icons/avatar.png"
import heart from "../icons/heart.png"
import eye from "../icons/eye.png"
import following from "../icons/following.png"
import axios from 'axios'

const commentsApi = axios.create({
    baseURL: "http://localhost:5000/api/comments",
    withCredentials: true
})

function Player({match}) {

    const [movie, setMovie] = useState([]);
    const [comments, setComments] = useState([]); 
    
    useEffect(() =>{
        getMovieById(match.params.id).then(resp=>{setMovie(resp)});
        getComments(match.params.id).then(resp=>{setComments(resp)})
    }, []);   

    
    const addComment = async () => {
        
        let field = document.getElementById("content");
        let content = field.value;
        field.value = null;
        
        const comment = {
            movie_id: movie.movie_id,
            comment_content: content
        }

        await commentsApi.post(`/add`,comment);
        getComments(match.params.id).then(resp=>{setComments(resp)});
    }

    return (
        <div>
            <section className=" container">
        <div className="movie-player-container">
            <div className="movie-player">
                <video id="videoPlayer" width="100%" controls muted="muted" autoPlay src={`http://localhost:5000/api/stream/play/${match.params.id}`} type="video/mp4"></video>
            </div>
            <div className="movie-info-box">
                <h2 className="movie-title">{movie.title}</h2>
                <div className="movie-action-btn-box">
                    <button className="btn movie-action-btn"><img className="movie-action-btn-img" src={heart} alt="heart"/></button>
                    <a href={`/polecanie/${match.params.id}`}><img className="movie-action-btn-img" src={following} alt="following"/></a>
                    <button className="btn movie-action-btn"><img className="movie-action-btn-img" src={eye} alt="eye"/></button>
    
                </div>
    
            </div>
        </div>
        
    </section>

    <section class="comments container"> 
        <div class="comments-header">
            <img src={commentIcon} class="comment-icon" width="35px" height="35px" alt="Comment icon" />
            <h1>Komentarze</h1>
        </div>

        <div class="comments-container">
            <div class="comment-form">
                <div class="comment-avatar">
                    <img src={avatar} class="comment-avatar-image" alt="User avatar"/>
                </div>
                <form class="comment-form-section-right">
                <div class="comment-section-right">
                    <div class="comment-content-bg comment-response-content">
                        <input id="content" type="text" class="comment-form-input" placeholder="Napisz komentarz..."/>
                    </div>
                </div>
                <button type="button" onClick={addComment} class="btn comment-btn-confirm"><img src={angleSmallRight} class="comment-btn-confirm-img" alt="Submit button"/></button>
                </form>
            </div>
        </div>

        <div class="comments-container comments-list">
        {comments.map(comment => (
            <div key={comment.comment_id} class="comment-item">            
                <div class="comment-avatar">
                    <img src={avatar} class="comment-avatar-image" alt="User avatar"/>
                </div>
                <div class="comment-section-right">
                    <h3 class="author"> {comment.nickname} </h3>
                    <div class="comment-content comment-content-bg">
                        <span class="comment-content-text"> {comment.comment_content} </span>
                        <div class="comment-action-buttons">
                            <button id="like" class="btn comment-action-btn"><img src={thumbsUp} class="comment-btn-img" alt="Like button"/></button>
                            <button id="dislike" class="btn comment-action-btn"><img src={thumbsDown} class="comment-btn-img" alt="Dislike button"/></button>
                            <button id="comment" class="btn comment-action-btn"><img src={commentIcon} class="comment-btn-img" alt="Comment button"/></button>
                        </div>
                    </div>
                </div>
            </div>
            ))}
            <div class="comments-response">
                <div class="comment-response-item">
                    <div class="comment-avatar">
                        <img src={avatar} class="comment-avatar-image" alt="User avatar"/>
                    </div>
                    <div class="comment-section-right">
                        <h3 class="author">Karolina</h3>
                        <div class="comment-content comment-content-bg">
                            <span class="comment-response-text">treść </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="comments-response">
                <div class="comment-response-item">
                    <div class="comment-avatar">
                        <img src={avatar} class="comment-avatar-image" alt="User avatar"/>
                    </div>
                    <div class="comment-section-right">
                        <h3 class="author">Karolina</h3>
                        <div class="comment-content comment-content-bg">
                            <span class="comment-response-text">tewfds ewds qwdse reść  jakas tam sobie komentarza jakas tam sobie 32wds 32rewd thrgfd 
                                ewfds refdew wefr assadjoi eifwd 2eifj if wefjdsjrg weifdjc wejf owfmfewn reść  jakas tam sobie komentarza jakas tam sobie 32wds 32rewd thrgfd 
                                ewfds refdew wefr assadjoi eifwd 2eifj if wefjdsjrg weifdjc wejf owfmfewn reść  jakas tam sobie komentarza jakas tam sobie 32wds 32rewd thrgfd 
                                ewfds refdew wefr assadjoi eifwd 2eifj if wefjdsjrg weifdjc wejf owfmfewn </span>
                        </div>
                    </div>
                </div>
            </div>



        </div>        
    </section>
            
        </div>
    )
}


export default Player;