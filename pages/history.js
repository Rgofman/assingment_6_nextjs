import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { useRouter } from 'next/router';
import { Card, ListGroup, Button } from 'react-bootstrap';
import styles from '@/styles/Home.module.css';

import { removeFromHistory } from '@/lib/userData';

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  if(!searchHistory) return null;

  let parsedHistory = [];

  searchHistory.forEach(h => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  const historyClicked = (e, index) => {
    const searchQuery = searchHistory[index];
    router.push(`/artwork?${searchQuery}`);
  };

  const removeHistoryClicked = async (index) => {
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  };

  return (
    <Card>
      <ListGroup variant="flush">
        {parsedHistory.length === 0 ? (
          <ListGroup.Item>
            <h4>Nothing Here</h4>
            Try searching for something else.
          </ListGroup.Item>
        )
          :
          (
            parsedHistory.map((historyItem, index) => (
              <ListGroup.Item key={index} onClick={() => historyClicked(event, index)} className={styles.historyListItem}>

                {Object.keys(historyItem).map((key) => (
                  <span key={key}>
                    {key}: <strong>{historyItem[key]}</strong>&nbsp;
                  </span>
                ))}

                <Button className="float-end" variant="danger" size="sm" onClick={(e) => { e.stopPropagation(); removeHistoryClicked(index); }}>
                  &times;
                </Button>

              </ListGroup.Item>
            ))
          )}
      </ListGroup>
    </Card>
  );
}
