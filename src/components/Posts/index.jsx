import { PostCard } from "../PostCard";
import './style.css'

export const Posts = ({ posts }) => {
  return (
    <div className="posts">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          cover={post.cover}
          id={post.id}
          title={post.title}
          body={post.body}
        />
      ))}
    </div>
  );
};
