function MapMarkerColorGuide() {
    return (
        <div className="absolute top-4 right-4 flex w-fit flex-col gap-2 rounded-lg bg-white p-3 shadow">
            <div className="flex items-center gap-1">
                <div className="bg-primary h-3 w-3 rounded-full" /> 입양
            </div>
            <div className="flex items-center gap-1">
                <div className="bg-destructive h-3 w-3 rounded-full" /> 실종
            </div>
            <div className="flex items-center gap-1">
                <div className="bg-accent h-3 w-3 rounded-full" /> 목격
            </div>
        </div>
    );
}

export default MapMarkerColorGuide;
