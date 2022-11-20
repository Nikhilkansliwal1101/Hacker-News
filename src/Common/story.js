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

const Story = props => {
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
          <Link href={props.url}>
            <Heading size="sm">
              {props.index}. {props.title}
            </Heading>
          </Link>
          <Text as="sub" fontSize="xs">
            {props.points} Points || {props.author} ||{' '}
            {timeAgo(new Date(props.timeStamp))} || {props.numComments} Comments
          </Text>
          <Box
            fontSize="xs"
            p={['2', '3', '5']}
            dangerouslySetInnerHTML={{ __html: props.storyText }}
          ></Box>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default Story;
