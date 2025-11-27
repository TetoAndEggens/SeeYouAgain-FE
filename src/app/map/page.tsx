'use client';

import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';

import VaulDrawer from '@/components/ui/drawer';
import useKakaoLoader from '@/hook/useKakaoLoader';
import MapMarkerColorGuide from '@/components/features/map/MapMarkerColorGuide';
import { MissingSmallCard } from '@/components/features/missing/MissingSmallCard';
import { useState } from 'react';

const testMissingData = [
    {
        id: 1,
        cardType: 'missing' as const,
        name: '뽀삐',
        tags: ['말티즈', '흰색', '2살'],
        location: '제주시 노형동',
        date: '2024.11.25',
        image: 'https://placedog.net/500',
        lng: 126.57029601730068,
        lat: 33.452782195539925,
    },
    {
        id: 2,
        cardType: 'sighting' as const,
        name: '코코',
        tags: ['푸들', '갈색', '3살'],
        location: '제주시 연동',
        date: '2024.11.24',
        image: 'https://placedog.net/510',
        lng: 126.57286276149365,
        lat: 33.45028010393749,
    },
    {
        id: 3,
        cardType: 'missing' as const,
        name: '나비',
        tags: ['코숏', '회색', '1살'],
        location: '제주시 이도동',
        date: '2024.11.23',
        image: 'https://placedog.net/600',
        lng: 126.56829601730068,
        lat: 33.454782195539925,
    },
    {
        id: 4,
        cardType: 'sighting' as const,
        name: '초코',
        tags: ['리트리버', '황금색', '5살'],
        location: '제주시 일도동',
        date: '2024.11.22',
        image: 'https://placedog.net/530',
        lng: 126.57486276149365,
        lat: 33.44828010393749,
    },
];

const MapPage = () => {
    const [loading, error] = useKakaoLoader();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isInfoOpen, setIsInfoOpen] = useState(-1);
    const [center, setCenter] = useState<{
        lng: number;
        lat: number;
    }>({ lat: 33.450701, lng: 126.570667 });
    const [coord, setCoord] = useState<{
        lng: number;
        lat: number;
    }>({ lng: 0, lat: 0 });
    const [bounds, setBounds] = useState<{
        sw: string;
        ne: string;
    }>();

    const handleClickMarker = (id: number, lng: number, lat: number) => {
        setIsInfoOpen((prev) => (prev === id ? -1 : id));
        // setCenter({ lat: Number(lat.toFixed(5)), lng: Number(lng.toFixed(5)) });
    };

    if (loading) {
        return <div className="flex h-full items-center justify-center">지도 로딩중..</div>;
    }
    if (error) {
        console.log(error);
        return <div className="flex h-full items-center justify-center">카카오맵 로딩 에러</div>;
    }

    return (
        <div className="relative h-full w-full">
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
                        sw: bounds.getSouthWest().toString(),
                        ne: bounds.getNorthEast().toString(),
                    });
                }}
            >
                {testMissingData &&
                    testMissingData.map((data) => (
                        <div key={`marker-wrapper-${data.id}`}>
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
                                onClick={() => handleClickMarker(data.id, data.lng, data.lat)}
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
                        </div>
                    ))}
            </Map>
            {/*지도 위 오버레이 공간*/}
            <div className="relative">
                <MapMarkerColorGuide />
                <div>{coord.lng}</div>
                <div>{coord.lat}</div>
            </div>
            <VaulDrawer
                open={isDrawerOpen}
                onOpenChange={setIsDrawerOpen}
                missingData={testMissingData}
            />
        </div>
    );
};

export default MapPage;
