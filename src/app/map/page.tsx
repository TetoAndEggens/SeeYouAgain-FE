'use client';

import VaulDrawer from '@/components/ui/drawer';
import useKakaoLoader from '@/hook/map/useKakaoLoader';
import MapMarkerColorGuide from '@/components/features/map/MapMarkerColorGuide';
import React from 'react';
import useMapState from '@/hook/map/useMapState';
import MapContainer from '@/components/features/map/MapContainer';
import { useMissingData } from '@/hook/map/useMissingData';
import { useQuery } from '@tanstack/react-query';
import { fetchAnimalMap } from '@/api/animal';

const MapPage = () => {
    const [loading, error] = useKakaoLoader();
    const mapState = useMapState();
    const { data } = useMissingData();

    const { data: mapData, isLoading: mapDataLoading } = useQuery({
        queryKey: ['animalMap'],
        queryFn: () =>
            fetchAnimalMap({
                minLatitude: mapState.bounds.sw[0],
                minLongitude: mapState.bounds.sw[1],
                maxLatitude: mapState.bounds.ne[0],
                maxLongitude: mapState.bounds.ne[1],
            }),
        select: (data) => data.data.animal.data,
        enabled: !loading && !error,
    });

    if (loading)
        return <div className="flex h-full items-center justify-center">지도 로딩중..</div>;

    if (error)
        return <div className="flex h-full items-center justify-center">카카오맵 로딩 에러</div>;

    return (
        <div className="relative h-full w-full">
            <MapContainer mapAnimalData={mapData} {...mapState} />
            {/*지도 위 오버레이 공간*/}
            <div className="relative">
                <MapMarkerColorGuide />
            </div>
            <VaulDrawer
                open={mapState.isDrawerOpen}
                onOpenChange={mapState.setIsDrawerOpen}
                mapAnimalData={data}
            />
        </div>
    );
};

export default MapPage;
