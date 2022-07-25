import '../Styling/Basic.scss'
import { faSmile} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Post( props ) {
    const { userLink, creator, image, videoLink, description, tags, postID, avatar } = props;
    const InterestedButton = (e) => {
      let element = e.target;
      if (!element.classList.contains("interested"))
        e.target.classList.add("interested");
      else
      e.target.classList.remove("interested");
    }
    const likedButton = (e) => {
      let element = e.target;
      if (!element.classList.contains("interested"))
        e.target.classList.add("interested");
      else
      e.target.classList.remove("interested");
    }
    return (
        <div class="post-container" data-id={postID}>
            <div class='author-container'>
                
            <a href={userLink}> <img class='avatar' src={require('../images/avatars/' + avatar + '.jpg').default}/> </a>
            <a href={userLink}> <span class='name'>{creator}</span> </a>
            </div>
            { image && <div class='image-container'><img src={image} /> </div> }
            { videoLink && <div class='video-container'> {videoLink}</div> }
            
            { description && <div class='description-container'> <div>{description} </div> </div> }
            <ul class='tags-container'> 
            { tags.map((e)=> <li class={e}>{e}</li> ) }

            <div className='action-container'>
            <a class="btn btn2 icon-container" onClick={likedButton} ><FontAwesomeIcon icon={faSmile}/></a>
            <div class="btn btn1" onClick={InterestedButton}>Interested</div>
              
            </div>
            </ul>
      </div>
    );
  }
  
  export default Post;