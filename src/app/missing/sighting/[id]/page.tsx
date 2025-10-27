import React from 'react';

type Props = {
    params: Promise<{ id: string }>;
};

const SightingDetailPage = async ({ params }: Props) => {
    const { id } = await params;
    return <div>목격 상세페이지 - ID: {id}</div>;
};

export default SightingDetailPage;
