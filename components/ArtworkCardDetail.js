import useSWR from 'swr';
import { Card } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';

import { favouritesAtom } from '@/store';
import { addToFavourites } from '@/lib/userData'
import { removeFromFavourites } from '@/lib/userData'


export default function ArtworkCardDetail({ objectID }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID))
  }, [favouritesList])



  async function favouritesClicked() {
    if (showAdded == true) {
      setFavouritesList(await removeFromFavourites(objectID))
      setShowAdded(false)
    }
    else {
      setFavouritesList(await addToFavourites(objectID))
      setShowAdded(true)
    }
  }

  const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/` + objectID : null);

  if (data) {
    return (
      <Card>
        {data.primaryImage && <Card.Img src={data.primaryImage} alt={data.title || 'N/A'} />}
        <Card.Body>
          <Card.Title>{data.title || 'N/A'}</Card.Title>
          <Card.Text>
            <strong>Date: </strong> {data.objectDate || 'N/A'}
            <br />
            <strong>Classification:</strong> {data.classification || 'N/A'}
            <br />
            <strong>Medium:</strong> {data.medium || 'N/A'}
            <br />
            <br />
            <strong>Artist:</strong> {data.artistDisplayName || 'N/A'}  {data.artistWikidata_URL && (
              <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">
                ( wiki )
              </a>
            )}
            <br />
            <strong>Credit Line:</strong> {data.creditLine || 'N/A'}
            <br />
            <strong>Dimensions:</strong> {data.dimensions || 'N/A'}
            <br />
            <br />
            <Button variant={showAdded ? "primary" : "outline-primary"} onClick={() => favouritesClicked()}>{showAdded ? "+ Favourite (added)" : "+ Favourite"}</Button>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return null;
};

