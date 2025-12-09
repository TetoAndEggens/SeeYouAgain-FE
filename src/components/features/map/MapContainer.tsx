import React from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import { MissingSmallCard } from '../missing/MissingSmallCard';
import type { MapState } from '@/hook/map/useMapState';
import type { MissingData } from '@/types/map';
import { parseCoordinates } from '@/lib/utils';

interface MapContainerProps extends MapState {
    missingData: MissingData[];
}

function MapContainer({
    missingData,
    center,
    isInfoOpen,
    setCoord,
    setBounds,
    setIsInfoOpen,
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
                setIsDrawerOpen(true);
                setIsInfoOpen(-1);
            }}
            onBoundsChanged={(map) => {
                const bounds = map.getBounds();
                setBounds({
                    sw: parseCoordinates(bounds.getSouthWest().toString()),
                    ne: parseCoordinates(bounds.getNorthEast().toString()),
                });
            }}
        >
            {missingData.map((data) => (
                <React.Fragment key={`marker-wrapper-${data.id}`}>
                    <MapMarker
                        clickable={true}
                        position={{
                            lat: data.lat,
                            lng: data.lng,
                        }}
                        image={{
                            src: `/markers/${data.cardType === 'missing' ? 'missing' : 'sighting'}.svg`,
                            size: { width: 36, height: 51.5 },
                        }}
                        onClick={() => setIsInfoOpen((prev) => (prev === data.id ? -1 : data.id))}
                    />
                    {isInfoOpen === data.id && (
                        <CustomOverlayMap
                            position={{
                                lat: data.lat,
                                lng: data.lng,
                            }}
                            yAnchor={1.4}
                        >
                            <div className="w-80">
                                <MissingSmallCard
                                    cardType={data.cardType}
                                    name={data.name}
                                    tags={data.tags}
                                    location={data.location}
                                    date={data.date}
                                    image={data.image}
                                />
                            </div>
                        </CustomOverlayMap>
                    )}
                </React.Fragment>
            ))}
        </Map>
    );
}

export default MapContainer;
