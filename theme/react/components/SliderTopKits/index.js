import React from "react";
import Slider from 'react-slick';

// Schema
import { schema } from './schema'

// Style
import './SliderTopKits.global.css';
import './slick.global.css';

const SliderTopKits = ({ title, banners, showComponent }) => {
    if(!showComponent) return null;

    const settings = {
        slidesToShow: 1,
        arrows: false,
        dots: true,
        autoplay: true,
        lazyLoad: true,
        adaptiveHeight: true,
        infinite: false,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 1,
                    infinite: true
                }
            }
        ]
    };

    const renderItem = (banner, index) => {
        const { points, title, description, discount, precoDe, precoPor, link, imageDesk } = banner;

		return (
            <div className="slider--top--content" key={index}>
                <div className="slider--top--content__item">
                    <img src={imageDesk} />

                    <div className="slider--top_item--text">
                        <div className="slider--top_item--text--points">
                            <span className="slider--top_item--text--points--item1">ganhe</span>
                            <span className="slider--top_item--text--points--item2">{points} pontos</span>
                        </div>

                        <h3>
                            <b>kit</b>
                            {title}
                        </h3>

                        <p>{description}</p>

                        <div className="slider--top_item--text--off">{discount}</div>

                        <div className="slider--top_item--text--precoDe">De R$ {precoDe}</div>
                        <div className="slider--top_item--text--precoPor">Por R$ {precoPor}</div>

                        <a href={link}>confira os pratos</a>
                    </div>
                </div>
            </div>
        )
	};

    return (
        <section className="slider--top">
            <h2>{title}</h2>

            <Slider {...settings}>
                {banners?.map((item, index) => (
                    renderItem(item, index)
                ))}
            </Slider>
        </section>
    )
}

SliderTopKits.schema = schema;

export default SliderTopKits;