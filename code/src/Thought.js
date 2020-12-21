import React, { useState, useEffect } from "react";
import moment from "moment";

export const Thought = (props) => {
	const [liked, setLiked] = useState(false);
	const [numLikes, setNumLikes] = useState(props.hearts);

	const handleLikeCount = (numLikes) => {
		setNumLikes(numLikes);
		props.onLike();
	};

	const clickedLikeButton = (thoughtID) => {
		setLiked(true);
	};

	const postLike = () => {
		const requestOptions = {
			method: "POST",
			redirect: "follow",
		};

		fetch(
			`https://karolin-happy-thoughts.herokuapp.com/thoughts/${props.id}/like`,
			requestOptions
		)
			.then((res) => res.json())
			.then((data) => {
				handleLikeCount(data.hearts);
			});
	};

	useEffect(() => {
		console.log("Thought Change!");
		if (liked) postLike();
		// eslint-disable-next-line
	}, [liked]);

	return (
		<div className="thought-card">
			<p className="message">{props.message}</p>
			<div className="bottom-container">
				{!liked && (
					<div>
						<button
							className={
								numLikes === 0
									? "no-likes-button"
									: numLikes > 0 && numLikes < 3
									? "like-button"
									: "mega-like-button"
							}
							onClick={() => clickedLikeButton(props.id)}
						>
							<span role="img" aria-label="heart emoji">
								❤️
							</span>
						</button>
						<span className="number-of-initial-likes">x {numLikes}</span>
					</div>
				)}
				{liked && (
					<div>
						<button disabled className="disabled-button">
							<span role="img" aria-label="heart emoji">
								{" "}
								❤️
							</span>
						</button>
						<span className="number-of-likes">x {numLikes}</span>
					</div>
				)}
				<p className="date">
					<span>{moment(props.createdAt).fromNow()}</span>
				</p>
			</div>
		</div>
	);
};
