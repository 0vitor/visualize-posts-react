import { useCallback, useEffect, useState } from "react";

import "./style.css";

import { loadPosts } from "../../utils/load-posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import { Posts } from "../../components/Posts";

export const Home = () => {
  const [posts, setPost] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const handleLoadPost = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();
    setAllPosts(postsAndPhotos);
    setPost(postsAndPhotos.slice(page, postsPerPage));
  }, []);

  useEffect(() => {
    handleLoadPost(0, postsPerPage);
  }, [handleLoadPost, postsPerPage]);
  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPost(posts);
    setPage(nextPage);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && <h1>Search value: {searchValue}</h1>}

        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>

      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

      {filteredPosts.length === 0 && <p>Não existem posts =(</p>}

      <div className="button-container">
        {!searchValue && (
          <Button
            text="Load more posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
};

/* handleClick = () => {
  this.setState(
    (prevState, prevProps) => {
      return { counter: prevState.counter + prevProps.numberToIncrement }
    },
    () => {
      console.log('POST', this.state.counter);
    }
  );
} */ 