import React from 'react';

type Props = {
    params: Promise<{ id: string }>;
};

const ChatRoomPage = async ({ params }: Props) => {
    const { id } = await params;
    return <div>채팅창 - ID: {id}</div>;
};

export default ChatRoomPage;
