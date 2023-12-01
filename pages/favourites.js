import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { Col, Row, Card, Pagination } from "react-bootstrap";
import { useState, useEffect } from "react";
import ArtworkCard from '@/components/ArtworkCard'

export default function Favourites() {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    if(!favouritesList) return null;

    if (!favouritesList) {
        return (
            <Card>
                <Card.Body>
                    <h4>Nothing Here</h4>
                    Try searching for something else.
                </Card.Body>
            </Card>
        )
    }

    else {
        return (
            <>
                <Row className="gy-4">
                    {favouritesList.length > 0 ? (
                        favouritesList.map((currentObjectID) => (
                            <Col lg={3} key={currentObjectID}>
                                <ArtworkCard objectID={currentObjectID} />
                            </Col>
                        ))
                    )
                        :
                        (
                            <Card>
                                <Card.Body>
                                    <h4>Nothing Here</h4>
                                    Try searching for something else.
                                </Card.Body>
                            </Card>
                        )}
                </Row>
            </>
        );
    }
};