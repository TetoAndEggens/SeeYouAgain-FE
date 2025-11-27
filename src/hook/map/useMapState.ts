import { CoordType, MapBounds } from '@/types/map';
import { useState } from 'react';

export default function useMapState() {
    const [isInfoOpen, setIsInfoOpen] = useState(-1);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [center, setCenter] = useState<CoordType>({ lat: 33.450701, lng: 126.570667 });
    const [coord, setCoord] = useState<CoordType>({ lng: 0, lat: 0 });
    const [bounds, setBounds] = useState<MapBounds>();

    return {
        isInfoOpen,
        isDrawerOpen,
        center,
        coord,
        bounds,

        setIsInfoOpen,
        setIsDrawerOpen,
        setCenter,
        setCoord,
        setBounds,
    };
}

export type MapState = ReturnType<typeof useMapState>;
