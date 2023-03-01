import { useState, useContext, useEffect } from "react";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { CurrentUserContext } from "../CurrentUserContext";
import PostService from "../services/post.service";

const VoteButtons = ({ isComment, post, comment }) => {
  const [voteStatus, setVoteStatus] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    // Check if it's a vote button for a comment or a post
    const votes = isComment ? comment.votes : post.votes;
    // Check if the current user has voted on the post or a comment
    const currentUserVote = votes.find(
      (vote) => currentUser && vote.user === currentUser._id
    );
    const hasVoted = currentUserVote !== undefined;
    // If the user voted set the value to the user's value, otherwise make it 0
    const voteValue = hasVoted ? currentUserVote.value : 0;
    // Sum up all the votes together
    const totalVotes = votes.reduce((total, vote) => total + vote.value, 0);
    setTotalVotes(totalVotes);
    setVoteStatus(voteValue);
  }, [post?.votes, comment?.votes, currentUser, isComment, comment]);

  // Handle the voting
  const handleVote = async (value) => {
    if (!currentUser) {
      alert("Please login to vote.");
      return;
    }
    try {
      // If the voting happens on a comment use the different route
      if (isComment) {
        await PostService.addVoteComment(comment._id, value);
      } else {
        await PostService.addVote(post._id, value);
      }
      // Logic to handle the color of the vote buttons based on the user vote values
      if (voteStatus === value) {
        setVoteStatus(0);
        setTotalVotes(totalVotes - value);
      } else if (
        (voteStatus === 1 && value === -1) ||
        (voteStatus === -1 && value === 1)
      ) {
        setVoteStatus(value);
        if (voteStatus === 1) setTotalVotes(totalVotes + 2 * value);
        if (voteStatus === -1) setTotalVotes(totalVotes + 2 * value);
      } else {
        setTotalVotes(totalVotes + value);
        setVoteStatus(value);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Flex flexDirection="column" alignItems="center">
      <IconButton
        icon={<TriangleUpIcon />}
        aria-label="upvote"
        onClick={() => handleVote(1)}
        bg="transparent"
        color={voteStatus === 1 ? "orange" : ""}
      />
      <Text>{totalVotes}</Text>
      <IconButton
        icon={<TriangleDownIcon />}
        aria-label="downvote"
        onClick={() => handleVote(-1)}
        bg="transparent"
        color={voteStatus === -1 ? "orange" : ""}
      />
    </Flex>
  );
};

export default VoteButtons;
