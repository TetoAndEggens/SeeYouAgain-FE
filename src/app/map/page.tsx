'use client';

import { Map, MapMarker } from 'react-kakao-maps-sdk';

import VaulDrawer from '@/components/ui/drawer';
import { useState } from 'react';
import useKakaoLoader from '@/hook/useKakaoLoader';
import MapMarkerColorGuide from '@/components/features/map/MapMarkerColorGuide';

const MapPage = () => {
    const [loading, error] = useKakaoLoader();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [coord, setCoord] = useState<{
        lng: number;
        lat: number;
    }>({ lng: 0, lat: 0 });
    const [bounds, setBounds] = useState<{
        sw: string;
        ne: string;
    }>();

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
                center={{
                    // 지도의 중심좌표
                    lat: 33.450701,
                    lng: 126.570667,
                }}
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
                }}
                onBoundsChanged={(map) => {
                    const bounds = map.getBounds();
                    setBounds({
                        sw: bounds.getSouthWest().toString(),
                        ne: bounds.getNorthEast().toString(),
                    });
                }}
            />
            <div className="relative">
                <MapMarkerColorGuide />
            </div>
            <VaulDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} coord={coord} />
        </div>
    );
};

export default MapPage;
