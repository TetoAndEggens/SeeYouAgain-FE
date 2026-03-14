import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import type { MapState } from '@/hook/map/useMapState';
import { parseCoordinates } from '@/lib/utils';
import { AdoptAnimal } from '@/types/animal';

interface MapContainerProps extends MapState {
    mapAnimalData: AdoptAnimal[];
}

function MapContainer({
    mapAnimalData,
    center,
    setCoord,
    setBounds,
    setSelectedCoord,
    setIsDrawerOpen,
}: MapContainerProps) {
    return (
        <Map // 지도를 표시할 Container
            center={center}
            isPanto={true}
            style={{
                // 지도의 크기
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                zIndex: 0,
            }}
            level={3} // 지도의 확대 레벨
            onClick={(_, mouseEvent) => {
                const latlng = mouseEvent.latLng;
                setCoord({ lng: latlng.getLng(), lat: latlng.getLat() });
                setSelectedCoord(null);
                setIsDrawerOpen(true);
            }}
            onIdle={(map) => {
                const bounds = map.getBounds();
                setBounds({
                    sw: parseCoordinates(bounds.getSouthWest().toString()),
                    ne: parseCoordinates(bounds.getNorthEast().toString()),
                });
            }}
        >
            {mapAnimalData &&
                mapAnimalData.map((data) => (
                    <MapMarker
                        key={data.animalId}
                        clickable={true}
                        position={{
                            lat: data.latitude,
                            lng: data.longitude,
                        }}
                        image={{
                            src: `/markers/${data.animalType}.svg`,
                            size: { width: 36, height: 51.5 },
                        }}
                        onClick={() => {
                            setIsDrawerOpen(true);
                            setSelectedCoord({
                                lat: data.latitude,
                                lng: data.longitude,
                            });
                        }}
                    />
                ))}
        </Map>
    );
}

export default MapContainer;
