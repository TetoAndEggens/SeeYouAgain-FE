import React from 'react';

type Props = {
    params: Promise<{ id: string }>;
};

const AdoptDetailPage = async ({ params }: Props) => {
    const { id } = await params;
    return <div>입양 상세페이지 - ID: {id}</div>;
};

export default AdoptDetailPage;
