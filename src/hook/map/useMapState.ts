import { CoordType, MapBounds } from '@/types/map';
import { useState } from 'react';

export default function useMapState() {
    const [isInfoOpen, setIsInfoOpen] = useState(-1);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [center, setCenter] = useState<CoordType>({ lat: 33.450701, lng: 126.570667 });
    const [coord, setCoord] = useState<CoordType>({ lng: 0, lat: 0 });
    const [selectedCoord, setSelectedCoord] = useState<CoordType | null>(null);
    const [bounds, setBounds] = useState<MapBounds>({
        sw: [33.44471121634997, 126.55954885531332],
        ne: [33.45509685289954, 126.5801048141521],
    });

    return {
        isInfoOpen,
        isDrawerOpen,
        center,
        coord,
        bounds,
        selectedCoord,

        setIsInfoOpen,
        setIsDrawerOpen,
        setCenter,
        setCoord,
        setBounds,
        setSelectedCoord,
    };
}

export type MapState = ReturnType<typeof useMapState>;
