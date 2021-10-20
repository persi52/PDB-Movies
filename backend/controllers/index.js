React = require('react');
useParams = require('react-router-dom').useParams();

const Video = () => {
    const {id} = useParams();

    return(
        
        <video width="1080" controls>
            <source src={`video/${id}`}/>
        </video>

    )
}

export default Video;