import React from 'react'
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



export function Player() {
    return (
        <div>
            <section class=" container">
        <div class="movie-player-container">
            <div class="movie-player">
                Tu bedzie film
            </div>
            <div class="movie-info-box">
                <h2 class="movie-title">Tytuł filmu</h2>
                <div class="movie-action-btn-box">
                    <button className="btn movie-action-btn"><img className="movie-action-btn-img" src={heart}/></button>
                    <button className="btn movie-action-btn"><img className="movie-action-btn-img" src={following}/></button>
                    <button className="btn movie-action-btn"><img className="movie-action-btn-img" src={eye}/></button>
    
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
                        <input type="text" class="comment-form-input" placeholder="Napisz komentarz..."/>
                    </div>
                </div>
                <button type="submit" class="btn comment-btn-confirm"><img src={angleSmallRight} class="comment-btn-confirm-img" alt="Submit button"/></button>
                </form>
            </div>
        </div>

        <div class="comments-container comments-list">
            <div class="comment-item">
                <div class="comment-avatar">
                    <img src={avatar} class="comment-avatar-image" alt="User avatar"/>
                </div>
                <div class="comment-section-right">
                    <h3 class="author">Ania</h3>
                    <div class="comment-content comment-content-bg">
                        <span class="comment-content-text">treść  jakas tam sobie komentarza jakas tam sobie 32wds 32rewd thrgfd 
                            ewfds refdew wefr assadjoi eifwd 2eifj if wefjdsjrg weifdjc wejf owfmfewn ewif woefweofwe  </span>
                        <div class="comment-action-buttons">
                            <button id="like" class="btn comment-action-btn"><img src={thumbsUp} class="comment-btn-img" alt="Like button"/></button>
                            <button id="dislike" class="btn comment-action-btn"><img src={thumbsDown} class="comment-btn-img" alt="Dislike button"/></button>
                            <button id="comment" class="btn comment-action-btn"><img src={commentIcon} class="comment-btn-img" alt="Comment button"/></button>
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