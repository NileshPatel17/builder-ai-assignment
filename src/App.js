import React from 'react';
import axios from 'axios';
import styled from 'styled-components'
import { Posts } from './posts'
import { Search } from './search';
import { Button } from './components/button'
import faker from 'faker'

const PAGE_SIZE = 20;
const useMockData = false;
function generateFakeData(pageSize) {
  return [...new Array(pageSize)].map(elem => ({
    id: faker.random.uuid(),
    title: faker.lorem.sentences(),
    author: faker.internet.userName(),
    url: faker.internet.url(),
    created_at: faker.date.past()
  }))
}
const Header = styled.div`
  display: flex;
  align-items: center;
  min-height: 40px;
  padding: 0.5rem 1rem;
  background-color:palevioletred;
  // background-image: linear-gradient(to right, #8e43e7, #00aeff);
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;


const AppContainer = styled.div`
margin:4px;
margin-top: 10px;
margin-bottom:20px;
overflow-y: auto;
// height: 100vh;
widht:100vw;
`;

const Container = styled.div`
overflow-y: auto;
height: 570px;
`;

const Loader = styled.div`
  margin:10px 0;
  padding:5px;
  color: white;
  font-size:18px; 
  background-color:orange;
  width:100vw;
`;

async function fetchPosts(pageIndex) {
  try {
    if (useMockData) {
      return new Promise(res => setTimeout(() => res(generateFakeData(PAGE_SIZE)), 1000))
    } else {
      const resp = await axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageIndex}`);
      return resp.data.hits.slice(0, PAGE_SIZE);
    }
  } catch (err) {
    console.log(err)
  }
}

function App() {
  const [currPage, setCurrPage] = React.useState(0)
  const [searchInput, setSearchInput] = React.useState(null)
  const [isLoading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [pageIndex, setPageIndex] = React.useState(0)
  const messageListRef = React.createRef();
  const bottomRef = React.createRef();

  const scrollCallback = (entries) => {
    if (entries[0].isIntersecting) {
      setLoading(true)
      fetchPosts(pageIndex).then(resp => {
        setData(prevData => (prevData || []).concat(resp));
        setPageIndex(pageIndex + 1)
        setLoading(false);
      })
    }
  }
  React.useEffect(() => {
    fetchPosts(pageIndex).then(resp => {
      setData(resp)
    })
    const scroll = new IntersectionObserver(scrollCallback, {
      root: messageListRef.current,
      rootMargin: '10px'
    });
    scroll.observe(bottomRef.current);
    return () => {
      scroll.disconnect();
    }
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    const interval = setInterval(() => {
      fetchPosts(pageIndex + 1).then(resp => {
        setPageIndex(pageIndex + 1)
        setData(prevData => [...prevData, ...resp]);
        setLoading(false);
      })

    }, 10000);

    return () => {
      clearInterval(interval)
    }
  }, [])

  const gotoPage = (pageNo) => {
    setCurrPage(pageNo)
  }
  const gotoPrev = () => {
    if (currPage + 1 > 1) {
      setCurrPage(currPage - 1)
    }
  }
  const gotoNext = () => {
    if (currPage + 1 < totalPages) {
      setCurrPage(currPage + 1)

    }
  }
  const onSearch = (inputs) => {
    setSearchInput(inputs)
  }
  let filterData = data ? [...data] : [];
  if (searchInput && searchInput.value) {
    filterData = filterByField(filterData, searchInput.searchBy, searchInput.value)
  }
  const start = currPage * PAGE_SIZE;
  const end = (currPage + 1) * PAGE_SIZE;
  const dataPerPage = filterData.slice(start, end)
  const totalPages = Math.ceil(filterData.length / PAGE_SIZE)
  return (
    <AppContainer>
      <Header>Posts</Header>
      <Search onSearch={onSearch} />
      <Container ref={messageListRef}>
        {dataPerPage.length > 0 && (<Posts data={dataPerPage} />)}
        <div ref={bottomRef}>{isLoading && <Loader>Loading..</Loader>}</div>
      </Container>
      <div>
        <Button onClick={() => gotoPage(0)}>first</Button>
        <Button onClick={() => gotoPrev()}>Prev</Button>
        <Button onClick={() => gotoNext()}>Next</Button>
        <Button onClick={() => gotoPage(totalPages - 1)}>Last</Button>
        <span>&nbsp;&nbsp;Page {currPage + 1} of {totalPages}</span>
      </div>
    </AppContainer>
  );
}

function filterByField(sourceData, field, searchInput) {
  return sourceData.filter(item => item[field] && item[field].toLowerCase().indexOf(searchInput.toLowerCase()) !== -1)

}

export default App;
