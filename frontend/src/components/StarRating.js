import React, { useState } from 'react'
import { FaStar } from "react-icons/fa";
import "../css/starrating.css"
import { addRating, getUserRate } from '../routes/ratingRoute';

const StarRating = (movie_id) => {

    const [rating, setRating] = useState(null);
    getUserRate(movie_id).then((resp)=>{setRating(resp)})
    const [hover, setHover] = useState(null);

    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return (
                    <label>
                        <input 
                            type="radio" 
                            name="rating" 
                            value={ratingValue} 
                            onClick={() => {
                                setRating(ratingValue);
                                addRating(ratingValue,movie_id)
                            }}
                            />
                            
                        <FaStar  
                            className="star" 
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9" } 
                            size={25}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                            />
                    </label>
                );
            })}
        </div>
    )
}

export default StarRating