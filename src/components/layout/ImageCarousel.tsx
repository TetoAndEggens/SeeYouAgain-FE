'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

// CSS imports
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface ImageCarouselProps {
    images: string[];
    alt?: string;
}

export function ImageCarousel({ images, alt = 'Image' }: ImageCarouselProps) {
    return (
        <Swiper
            modules={[Pagination, Navigation]}
            pagination={{
                clickable: true,
            }}
            spaceBetween={10}
            slidesPerView={1}
        >
            {images.map((image, idx) => (
                <SwiperSlide key={idx}>
                    <img src={image} alt={`${alt} ${idx + 1}`} className="object-contain" />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
