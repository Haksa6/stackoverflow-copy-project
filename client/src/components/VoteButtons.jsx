import { useState } from "react";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";

const VoteButtons = ({ votes }) => {
  const [voteStatus, setVoteStatus] = useState(0);

  const handleUpvote = () => {
    // make a POST request to update the vote count on the server
    // increment the vote count in state
    if (voteStatus === 1) {
      setVoteStatus(0);
    } else {
      setVoteStatus(1);
    }
  };

  const handleDownvote = () => {
    // make a POST request to update the vote count on the server
    // decrement the vote count in state
    if (voteStatus === -1) {
      setVoteStatus(0);
    } else {
      setVoteStatus(-1);
    }
  };

  return (
    <Flex flexDirection="column" alignItems="center">
      <IconButton
        icon={<TriangleUpIcon />}
        onClick={handleUpvote}
        aria-label="upvote"
        bg="transparent"
        color={voteStatus === 1 ? "orange" : ""}
      />
      <Text>{voteStatus}</Text>
      <IconButton
        icon={<TriangleDownIcon />}
        onClick={handleDownvote}
        aria-label="downvote"
        bg="transparent"
        color={voteStatus === -1 ? "orange" : ""}
      />
    </Flex>
  );
};

export default VoteButtons;
