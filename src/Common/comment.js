import {
  Card,
  Stack,
  CardBody,
  Heading,
  Text,
  Link,
  Box,
} from '@chakra-ui/react';
import timeAgo from './calculateTimeAgo';

const Comment = props => {
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
      maxW="800"
      margin="1"
    >
      <Stack textAlign="left">
        <CardBody>
          <Heading size="sm">{props.index}</Heading>
          <Text as="sub" fontSize="xs">
            {props.author} || {timeAgo(new Date(props.timeStamp))} || On :{' '}
            <Link href={props.url}>{props.title}</Link>
          </Text>
          <Box
            fontSize="xs"
            p={['2', '3', '5']}
            dangerouslySetInnerHTML={{ __html: props.commentText }}
          ></Box>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default Comment;
