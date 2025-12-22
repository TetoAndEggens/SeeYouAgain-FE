'use client';

import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface StaticMapProps {
    latitude: number;
    longitude: number;
    markerType?: 'MISSING' | 'WITNESS' | 'ABANDONED';
    level?: number;
    height?: string;
}

export function StaticMap({
    latitude,
    longitude,
    markerType = 'MISSING',
    level = 3,
    height = '300px',
}: StaticMapProps) {
    return (
        <Map
            center={{ lat: latitude, lng: longitude }}
            style={{
                width: '100%',
                height,
                borderRadius: '0.5rem',
            }}
            level={level}
        >
            <MapMarker
                position={{ lat: latitude, lng: longitude }}
                image={{
                    src: `/markers/${markerType}.svg`,
                    size: { width: 36, height: 51.5 },
                }}
            />
        </Map>
    );
}
