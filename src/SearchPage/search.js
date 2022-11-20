import {
  Box,
  Button,
  HStack,
  Select,
  SimpleGrid,
  Text,
  Input,
  ChakraProvider,
  Grid,
  theme,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Story from '../Common/story';
import Comment from '../Common/comment';
import Header from '../Common/header';

const SearchPage = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(30);
  const [tags, setTags] = useState('(story,comment)');
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('search_by_date');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(new Date().getTime() / 1000);
  const [newsList, setNewsList] = useState([]);

  const [customStartTime, setCustomStartTime] = useState(new Date().getTime());
  const [customEndTime, setCustomEndTime] = useState(new Date().getTime());
  const [isWrongTimeRange, setIsWrongTimeRange] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const updateTime = value => {
    const currentTime = new Date().getTime() / 1000;
    switch (value) {
      case '1':
        setEndTime(currentTime);
        setStartTime(0);
        break;
      case '2':
        setEndTime(currentTime);
        setStartTime(currentTime - 24 * 60 * 60);
        break;
      case '3':
        setEndTime(currentTime);
        setStartTime(currentTime - 7 * 24 * 60 * 60);
        break;
      case '4':
        setEndTime(currentTime);
        setStartTime(currentTime - 30 * 7 * 24 * 60 * 60);
        break;
      case '5':
        setEndTime(currentTime);
        setStartTime(currentTime - 365 * 7 * 24 * 60 * 60);
        break;
      case '6':
        onOpen();
        break;
      default:
        break;
    }
  };

  const formateDate = date => {
    var year = date.toLocaleString('default', { year: 'numeric' });
    var month = date.toLocaleString('default', { month: '2-digit' });
    var day = date.toLocaleString('default', { day: '2-digit' });

    return year + '-' + month + '-' + day;
  };
  const customDateRange = () => {
    if (customEndTime < customStartTime) {
      setIsWrongTimeRange(true);
    } else {
      setEndTime(customEndTime / 1000 + 24 * 60 * 60);
      setStartTime(customStartTime / 1000);
      setIsWrongTimeRange(false);
      onClose();
    }
  };

  useEffect(() => {
    fetch(
      `https://hn.algolia.com/api/v1/${sortBy}?tags=${tags}&page=${page}&hitsPerPage=${pageSize}&numericFilters=created_at_i>${startTime},created_at_i<=${endTime}&query=${query}`
    ).then(res => {
      if (res.status === 200) {
        res.json().then(data => {
          setNewsList(data['hits']);
        });
      }
    });
  }, [page, pageSize, tags, query, sortBy, startTime, endTime]);

  const newsItems = newsList.map((news, index) => {
    if (news._tags[0] === 'story') {
      return (
        <Story
          key={news.objectID}
          title={news.title}
          timeStamp={news.created_at}
          index={page * pageSize + index + 1}
          url={news.url}
          author={news.author}
          points={news.points}
          numComments={news.num_comments}
          storyText={news.story_text}
        />
      );
    } else if (news._tags[0] === 'comment') {
      return (
        <Comment
          key={news.objectID}
          title={news.story_title}
          timeStamp={news.created_at}
          index={page * pageSize + index + 1}
          url={news.story_url}
          author={news.author}
          commentText={news.comment_text}
        />
      );
    }
    return <>Error Loading</>;
  });

  return (
    <>
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Header />
          <Grid minH="100vh" p={3}>
            <Box>
              <HStack>
                <Input
                  placeholder="Search"
                  onChange={e => {
                    setQuery(e.target.value);
                  }}
                />
              </HStack>
              <HStack justify="center" wrap={['wrap', 'nowrap', 'nowrap']}>
                <Text>Search</Text>
                <Select
                  value={tags}
                  onChange={e => {
                    setTags(e.target.value);
                  }}
                >
                  <option value="(story,comment)" defaultValue>
                    All
                  </option>
                  <option value="story">Stories</option>
                  <option value="comment">Comments</option>
                </Select>
                <Text>By</Text>
                <Select
                  value={sortBy}
                  onChange={e => {
                    setSortBy(e.target.value);
                  }}
                >
                  <option value="search_by_date" defaultValue>
                    Date
                  </option>
                  <option value="search">Popularity</option>
                </Select>
                <Text>For</Text>
                <Select
                  onChange={e => {
                    updateTime(e.target.value);
                  }}
                >
                  <option value="1" defaultValue>
                    All time
                  </option>
                  <option value="2">Last 24h</option>
                  <option value="3">Past Week</option>
                  <option value="4">Past Month</option>
                  <option value="5">Past Year</option>
                  <option
                    value="6"
                    onClick={() => {
                      alert('hello');
                    }}
                  >
                    Custom Range
                  </option>
                </Select>
              </HStack>
            </Box>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Select Time Range</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>Start Date</Text>
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="date"
                    value={formateDate(new Date(customStartTime))}
                    onChange={e => {
                      setCustomStartTime(new Date(e.target.value).getTime());
                    }}
                  />
                  <Text>End Date</Text>
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="date"
                    value={formateDate(new Date(customEndTime))}
                    onChange={e => {
                      setCustomEndTime(new Date(e.target.value).getTime());
                    }}
                  />
                  {isWrongTimeRange ? (
                    <Box textColor="red">Select Correct Time Range</Box>
                  ) : (
                    <></>
                  )}
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button colorScheme="green" mr={3} onClick={customDateRange}>
                    Apply
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
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
                <Button>{page}</Button>
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

export default SearchPage;
