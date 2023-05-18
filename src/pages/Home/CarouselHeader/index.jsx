import React from "react";
import Slider from "react-slick";
import plane from '../../../assets/home/Banner-plane.jpg'

export default function CarouselHeader({ children }) {
    const settings = {
        dots: false,
        autoplay: true,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const options = {
        container: {
            width: '100vw',
            zIndex: 0,
            position: 'relative',
            margin: '-10vh 0 8vh'
        },
        media: {
            width: '100%',
            height: '80vh',
            objectFit: 'cover'
        }
    }
    return (
        <div style={options.container}>
            <Slider {...settings}>
                <div>
                    <img style={options.media} src="https://passageirodeprimeira.com/wp-content/uploads/2023/01/azul-viagens-oferece-ate-20-pontos-por-real-gasto-na-compra-de-ingressos-da-universal-banner.jpg" alt="" />
                </div>
                <div>
                    <img style={options.media} src="https://cdnstatic8.com/mevoyturismo.com/wp-content/uploads/2020/01/banner-viagens-ferias.jpg" alt="" />
                </div>
                <div>
                    <img style={options.media} src={plane} alt="" />
                </div>
            </Slider>
        </div>
    );
}
