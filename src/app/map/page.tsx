'use client';

import VaulDrawer from '@/components/ui/drawer';
import useKakaoLoader from '@/hook/map/useKakaoLoader';
import MapMarkerColorGuide from '@/components/features/map/MapMarkerColorGuide';
import React, { useState, useMemo } from 'react';
import useMapState from '@/hook/map/useMapState';
import MapContainer from '@/components/features/map/MapContainer';
import { useQuery } from '@tanstack/react-query';
import { fetchAnimalMap } from '@/api/animal';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import type { MapBounds } from '@/types/map';
import NotFound from '@/components/layout/404';

const MapPage = () => {
    const mapState = useMapState();
    const [loading, error] = useKakaoLoader();
    const [searchBounds, setSearchBounds] = useState<MapBounds>(mapState.bounds);

    const { data: mapData, isLoading: mapDataLoading } = useQuery({
        queryKey: ['animalMap', searchBounds],
        queryFn: () =>
            fetchAnimalMap({
                size: 100,
                sortDirection: 'LATEST',
                minLatitude: searchBounds.sw[0],
                minLongitude: searchBounds.sw[1],
                maxLatitude: searchBounds.ne[0],
                maxLongitude: searchBounds.ne[1],
            }),
        select: (data) => data.data.animal.data,
        placeholderData: (prev) => prev,
        staleTime: 3 * 60 * 1000,
        enabled: !loading && !error,
    });

    // 지도가 이동했는지 감지
    const hasMapMoved = useMemo(() => {
        return (
            mapState.bounds.sw[0] !== searchBounds.sw[0] ||
            mapState.bounds.sw[1] !== searchBounds.sw[1] ||
            mapState.bounds.ne[0] !== searchBounds.ne[0] ||
            mapState.bounds.ne[1] !== searchBounds.ne[1]
        );
    }, [mapState.bounds, searchBounds]);

    const filteredMapData = useMemo(() => {
        const filter = mapState.selectedCoord;

        if (!filter) return mapData;

        return mapData?.filter(
            (data) =>
                Math.abs(data.latitude - filter.lat) < 0.000001 &&
                Math.abs(data.longitude - filter.lng) < 0.000001
        );
    }, [mapData, mapState.selectedCoord]);

    const handleSearchCurrentArea = () => {
        setSearchBounds(mapState.bounds);
    };

    if (loading)
        return <div className="flex h-full items-center justify-center">지도 로딩중..</div>;

    if (error) return <NotFound />;

    return (
        <div className="relative h-full w-full">
            <MapContainer mapAnimalData={mapData ?? []} {...mapState} />
            {/*지도 위 오버레이 공간*/}
            <div className="relative">
                <MapMarkerColorGuide />
            </div>
            {hasMapMoved && (
                <Button
                    className="absolute top-4 left-1/2 z-20 -translate-x-1/2 gap-2 shadow-lg"
                    onClick={handleSearchCurrentArea}
                    disabled={mapDataLoading}
                >
                    <RefreshCw size={16} className={mapDataLoading ? 'animate-spin' : ''} />
                    {mapDataLoading ? '검색 중...' : '현 지도에서 검색'}
                </Button>
            )}
            <VaulDrawer
                open={mapState.isDrawerOpen}
                onOpenChange={mapState.setIsDrawerOpen}
                mapAnimalData={filteredMapData ?? []}
            />
        </div>
    );
};

export default MapPage;
