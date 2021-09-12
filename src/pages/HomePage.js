import React from 'react';
import { Carousel } from 'react-bootstrap';

export const HomePage = (props) => {
    return (
        <Carousel prevIcon={null} prevLabel={null} nextIcon={null} nextLabel={null}>
            <Carousel.Item>
                <img
                    onClick={() => props.history.push('/products')}
                    className="d-block w-100"
                    src="https://img-diva.vecernji.hr/uwRxvbuq7Z1DALO7BjYWKpSpcQA=/785x0/smart/media/images/2019-47/lykke-timeless-rose-nausnice.jpg"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    onClick={() => props.history.push('/products')}
                    className="d-block w-100"
                    src="https://img-diva.vecernji.hr/qMXGpDUpEFpbcKD4lpg2tfLwRy0=/1280x857/smart/media/images/2019-47/lykke-bridal-kolekcija_02.jpg"
                />
            </Carousel.Item>
        </Carousel>
    );
}
