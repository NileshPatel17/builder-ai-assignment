import React from 'react';
import axios from 'axios';
import styled from 'styled-components'
import { Posts } from './posts'
import { Search } from './search';

const Container = styled.div`
  margin:4px;
  margin-top: 10px;
  margin-bottom:20px;
  overflow-y: auto;
  height: 500px;
  widht:100vw;
  li {
    margin: 0.5rem 0;
  }
  p {
    margin-top: 0.25rem;
  }
`;

const Loader = styled.div`
  margin:10px 0;
  padding:10px;
  color: white;
  font-size:18px; 
  background-color:orange;
`;

async function fetchPosts(pageIndex) {
  try {
    const resp = await axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageIndex}`);
    return resp.data.hits;
  } catch (err) {
    console.log(err)
  }
}

function App() {
  const [inputTitle, setInputTitle] = React.useState('')
  const [isLoading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [pageIndex, setPageIndex] = React.useState(0)
  const messageListRef = React.createRef();
  const bottomRef = React.createRef();

  const scrollCallback = (entries) => {
    if (entries[0].isIntersecting) {
      setLoading(true)
      setTimeout(() => {
        fetchPosts(pageIndex).then(resp => {
          setData(prevData => [...prevData, ...resp]);
          setPageIndex(pageIndex + 1)
          setLoading(false);

        })
      }, 2000);
    }
  }
  React.useEffect(() => {
    fetchPosts(pageIndex).then(resp => {
      setData(resp)
    })
    const scroll = new IntersectionObserver(scrollCallback, {
      root: messageListRef.current,
      // rootMargin: '10px'
    });
    scroll.observe(bottomRef.current);
    return () => {
      scroll.disconnect();
    }
    // eslint-disable-next-line
  }, [])

  const onSearch = (title, author) => {
    setInputTitle(title)
  }
  let filterData = data ? [...data] : [];
  if (inputTitle) {
    filterData = filterByData(filterData, "title", inputTitle)
  }
  return (
    <Container ref={messageListRef}>
      <Search onSearch={onSearch} />
      {filterData ? (<Posts data={filterData} />) : (<p>no data found</p>)}
      <div ref={bottomRef}>{isLoading && <Loader>Loading..</Loader>}</div>
    </Container>
  );
}

function filterByData(sourceData, field, searchInput) {
  const filt = sourceData.filter(item => item[field].indexOf(searchInput) !== -1)
  return filt;

}

export default App;
