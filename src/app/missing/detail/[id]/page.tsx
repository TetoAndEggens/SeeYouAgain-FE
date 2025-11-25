import React from 'react';

type Props = {
    params: Promise<{ id: string }>;
};

const LostDetailPage = async ({ params }: Props) => {
    const { id } = await params;
    return <div>실종/목격 상세페이지 - ID: {id}</div>;
};

export default LostDetailPage;
