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

const MapPage = () => {
    const [loading, error] = useKakaoLoader();
    const mapState = useMapState();
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

    const handleSearchCurrentArea = () => {
        setSearchBounds(mapState.bounds);
    };

    if (loading)
        return <div className="flex h-full items-center justify-center">지도 로딩중..</div>;

    if (error)
        return <div className="flex h-full items-center justify-center">카카오맵 로딩 에러</div>;

    return (
        <div className="relative h-full w-full">
            <MapContainer mapAnimalData={mapData ?? []} {...mapState} />
            {/*지도 위 오버레이 공간*/}
            <div className="relative">
                <MapMarkerColorGuide />
            </div>
            {/* 지도 이동 시 재검색 버튼 */}
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
                mapAnimalData={mapData ?? []}
            />
        </div>
    );
};

export default MapPage;
