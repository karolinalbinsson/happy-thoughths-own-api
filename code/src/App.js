import React, { useState, useEffect } from "react";
import { LikeCounter } from "./LikeCounter";
import { Loader } from "./Loader";
import { Thought } from "./Thought";
import { Form } from "./Form"

export const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [messageOK, setMessageOK] = useState(true);
  const [loading, setLoading] = useState(true);
  const initialLikeCount = () => Number(window.localStorage.getItem("count")) || 0;
  const [likeCount, increaseLikeCount] = useState(initialLikeCount);

  useEffect(() => {
    getThoughts();
  }, []);

  useEffect(()=>{
    window.localStorage.setItem("count",likeCount);
  },[likeCount]);

  const getThoughts = () =>{
    fetch("https://happy-thoughts-technigo.herokuapp.com/thoughts")
    .then((res) => res.json())
    .then((data) => {
      setThoughts(data);
      setLoading(false);
    });
  };

  const handleLikes = () => {
    increaseLikeCount((likeCount) => likeCount+1);
  };

  const handleSubmit = (newMessage) => {
    postThought(newMessage);
  };

  const postThought = (message) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const messageToPost = JSON.stringify({message: message});
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: messageToPost,
      redirect: 'follow'
    };
    
    fetch("https://happy-thoughts-technigo.herokuapp.com/thoughts", requestOptions)
    .then((res) => 
      res.json()
    )
    .then((newThought) => { 
      console.log(newThought);
      if(newThought.errors !== undefined)
        {
          setMessageOK(false);
          console.error(newThought.message);
        } else {
          setMessageOK(true);
          getThoughts();
          }
      }
    ).catch((error) => console.log(error))
  }

  return (
  <section className="app-container">
    <header className="header">
    {likeCount > 0 && <LikeCounter numberOfLikes={likeCount}/>}
    </header>
    <Form 
      submitForm = {handleSubmit}
    />
    {!messageOK && <p>Couldn't save message, check the length (5-140) and try again.</p>}
    {loading && <Loader />}
    {!loading &&
    <section className="thoughts-list">
        {thoughts.map((thought) => (
          <Thought 
          key= {thought._id}
            id = {thought._id}
            message = {thought.message}
            createdAt = {thought.createdAt}
            hearts = {thought.hearts}
            onLike = {handleLikes}
          />
          ))}
    </section>}
  </section>
  )
}