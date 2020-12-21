import React from "react";

export const LikeCounter = (props) =>{
  return (
    <section className="like-counter">
      <span role="img" aria-label="heart emoji">
        ❤️</span> 
      <p className="likes">{props.numberOfLikes}</p>
    </section>
  )
}