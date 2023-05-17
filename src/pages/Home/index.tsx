import PostInput from "../../components/PostInput";
import { Typography, Snackbar, Alert } from "@mui/material";
import { AvatarWithStatus } from "../../components/AvatarWithStatus";
import PostCardSkeleton from "../../components/Placeholders/PostCardSkeleton";
import PostCards from "../../components/PostCards";
import { useDispatch, useSelector } from "react-redux";
// import { setToken } from '../Login/features/loginSlice';
import { removeMainError } from "./features/homeSlice";
import { usePostsQuery } from "../../components/hooks/usePostsQuery";
import "../../components/MessageSection/style/style.scss";
import React from "react";
import RefreshIcon from "../../components/MessageSection/Helpers/RefreshIcon";

const Home = ({ currentUser }) => {
  const mainError = useSelector((state: any) => state.home.mainError);
  const dispatch = useDispatch();
  const postsQuery = usePostsQuery();
  const handleClose = () => {
    dispatch(removeMainError());
  };

  return (
    <div className="center container">
      {/* ERROR SNACKBAR probs need to make this only in nav*/}
      <div
        className="page-width"
        style={{
          overflow: "scroll",
          height: "100%",
          scrollbarWidth: "none",
          paddingTop: "6rem",
        }}
      >
        {mainError && (
          <Snackbar
            open={mainError ? true : false}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="error" onClose={handleClose}>
              {mainError}
            </Alert>
          </Snackbar>
        )}
        <div className="center">
          <AvatarWithStatus user={currentUser} width={"5rem"} height={"5rem"} />
          <Typography sx={{ mb: 2 }}>{currentUser.username}</Typography>
        </div>
        <div>
          <div>
            <PostInput />
          </div>
        </div>
        <div>
          {postsQuery.isLoading ? (
            <PostCardSkeleton column={undefined} />
          ) : (
            <PostCards currentUser={currentUser} posts={undefined} />
          )}
          {postsQuery.isFetchingNextPage && <RefreshIcon classes={"pt-4"} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
