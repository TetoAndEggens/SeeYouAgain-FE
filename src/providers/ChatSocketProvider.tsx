'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { connect, disconnect } from '@/lib/stompClient';

const ChatSocketProvider = () => {
    const pathName = usePathname();
    const chatRef = React.useRef<boolean>(false);

    React.useEffect(() => {
        const isChat = pathName.startsWith('/chat');

        if (isChat && !chatRef.current) {
            connect();
        }

        if (!isChat && chatRef.current) {
            disconnect();
        }

        chatRef.current = isChat;
    }, [pathName]);

    return null;
};

export default ChatSocketProvider;
