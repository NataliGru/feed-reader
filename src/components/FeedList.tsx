import { useFeedContext } from "../context/FeedContext";
import { FeedItem } from "./FeedItem";

import '../styles/FeedList.scss';

export const FeedList: React.FC = () => {

  const { feeds } = useFeedContext();

  return (
    <div className='list'>
      <div className="title">
      </div>
      {feeds.map(feed => (
        <FeedItem key={feed.id} feed={feed}/>
      )) }
    </div>
  );
};