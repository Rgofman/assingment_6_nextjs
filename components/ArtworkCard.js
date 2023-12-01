import useSWR from 'swr'
import Error from 'next/error';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';

export default function ArtworkCard({ objectID }) {

    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/` + objectID);

    if (!data) {
        return null
    }

    else {
        if (error) {
            return <Error statusCode={404} />;
        }
        return (
            <Card>
                <Card.Img
                    variant="top"
                    src={data.primaryImageSmall || 'https://via.placeholder.com/375x375.png?text=[Not+Available]'}
                />
                <Card.Body>
                    <Card.Title>{data.title || 'N/A'}</Card.Title>
                    <Card.Text>
                        <strong>Date:</strong> {data.objectDate || 'N/A'}
                        <br />
                        <strong>Classification:</strong> {data.classification || 'N/A'}
                        <br />
                        <strong>Medium:</strong> {data.medium || 'N/A'}
                    </Card.Text>
                    <Link href={`/artwork/` + objectID} passHref>
                        <Button variant="outline-dark">ID: {objectID}</Button>
                    </Link>
                </Card.Body>
            </Card>

        );
    }
};