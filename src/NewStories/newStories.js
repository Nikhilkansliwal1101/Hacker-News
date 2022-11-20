import {
  Box,
  Button,
  HStack,
  Select,
  SimpleGrid,
  ChakraProvider,
  Grid,
  theme,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Story from '../Common/story';
import Header from '../Common/header';

const NewStoryPage = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(30);
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetch(
      `https://hn.algolia.com/api/v1/search_by_date?tags=(story,show_hn,ask_hn)&page=${page}&hitsPerPage=${pageSize}`
    ).then(res => {
      if (res.status === 200) {
        res.json().then(data => {
          setNewsList(data['hits']);
        });
      }
    });
  }, [page, pageSize]);

  const newsItems = newsList.map((news, index) => {
    return (
      <Story
        key={news.objectID}
        title={news.title}
        type={news._tags[0]}
        timeStamp={news.created_at}
        index={page * pageSize + index + 1}
        url={news.url}
        author={news.author}
        points={news.points}
        numComments={news.num_comments}
      />
    );
  });

  return (
    <>
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Header />
          <Grid minH="100vh" p={3}>
            <SimpleGrid justifyContent="center" margin="3">
              {newsItems}
            </SimpleGrid>
            <Box>
              <Select
                onChange={e => {
                  setPageSize(e.target.value);
                  setPage(0);
                }}
              >
                <option value={30} defaultValue>
                  30
                </option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </Select>
              <HStack justify="space-between" marginTop="3">
                <Button
                  onClick={() => {
                    setPage(page - 1 > 0 ? page - 1 : 0);
                  }}
                >
                  Previous
                </Button>
                <Button>Page : {page + 1}</Button>
                <Button
                  onClick={() => {
                    setPage(page + 1);
                  }}
                >
                  Next
                </Button>
              </HStack>
            </Box>
          </Grid>
        </Box>
      </ChakraProvider>
    </>
  );
};

export default NewStoryPage;
