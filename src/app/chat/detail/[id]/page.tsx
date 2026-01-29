'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useMessage } from '@/hook/chat/useMessage';
// import { useChatListData, useChatDetailData } from '@/hook/chat/useChatListData';
import { ChatMessage } from '@/components/layout/ChatMessage';
import { ChevronLeft, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';

type Props = {
    params: { id: string };
};

const ChatRoomPage = ({ params }: Props) => {
    const router = useRouter();
    const chatRoomId = Number(params.id);

    const { chatMessage, isLoading, isError } = useMessage({
        chatRoomId,
        cursorId: null,
        size: 20,
        sortDirection: 'LATEST',
    });
    // const { data: listData } = useChatListData();
    // const { id } = React.use(params);
    // const list = listData[id - 1];
    // const { data } = useChatDetailData();
    // console.log('listData : ', listData[id]);

    return (
        <div>
            <div className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-gray-600 bg-[#F8F9FA] p-4">
                <div className="flex items-center justify-between bg-auto">
                    <button
                        aria-label={'뒤로가기'}
                        onClick={() => router.back()}
                        className="cursor-pointer"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button onClick={() => router.back()} className="cursor-pointer">
                        {/* <p className="text-lg font-bold">{list.userName}</p> */}
                        {/* <p className="text-lg font-bold">{list.userName}</p> */}
                    </button>
                </div>
            </div>

            <div>
                {/* {isLoading ? (
                    <div className="p-4 text-center">로딩 중입니다.</div>
                ) : isError ? (
                    <div className="p-4 text-center">메시지를 불러오지 못했습니다.</div>
                ) : !chatMessage || chatMessage.data.length === 0 ? (
                    <div className="p-4 text-center">메시지가 없습니다.</div>
                ) : (
                    chatMessage.data.map((m) => {
                        const mine = false; // 수정 필요(임시)

                        return (
                            <ChatMessage
                                key={m.messageId}
                                message={m.content}
                                mine={mine}
                                time={m.createdAt}
                            />
                        );
                    })
                )} */}
                <div>
                    {/* <ChatPost title={list.title} post={list.post} className="rounded-lg border" /> */}
                </div>
                {/* {data.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="flex justify-center">
                                <p className="bg-gray-20 m-4 rounded-lg border px-4 py-2">
                                    {item.date}
                                </p>
                            </div>
                            {item.content.map((content, contentIdx) => {
                                return (
                                    <div key={contentIdx}>
                                        <ChatMessage
                                            message={content.message}
                                            mine={content.isMe}
                                            time={content.time}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    );
                })} */}
            </div>

            <div className="sticky bottom-0 flex items-center gap-4 bg-white p-2">
                <Input />
                <Send />
            </div>
        </div>
    );
};

export default ChatRoomPage;
