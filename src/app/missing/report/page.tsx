import { Form } from '@/components/layout/Form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Camera, Search } from 'lucide-react';
import React from 'react';

const MissingWritePage = () => {
    return (
        <div>
            <div className="bg-gray-10 flex flex-col gap-12 p-4">
                <div>
                    <Form title="게시글 종류">
                        <div className="flex gap-4">
                            <Button className="flex flex-1 flex-col" variant={'outline'}>
                                <Search />
                                실종
                            </Button>
                            <Button className="flex flex-1 flex-col">
                                <Camera />
                                목격
                            </Button>
                        </div>
                    </Form>
                </div>
                <div>
                    <Form title="제목">
                        <Input placeholder="예: 흰색 말티즈를 찾습니다" />
                    </Form>
                </div>
                <div>
                    <Form title="상세 내용">
                        <Textarea
                            placeholder={'실종/목격 상황을 자세히 설명해주세요.'}
                            className="h-[6rem] items-start"
                        />
                    </Form>
                </div>
                <div>
                    <Form title="상세 정보">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                            <Form title="품종">
                                <Input />
                            </Form>
                            <Form title="나이">
                                <Input />
                            </Form>
                            <Form title="성별">
                                <Input />
                            </Form>
                            <Form title="무게">
                                <Input />
                            </Form>
                            <Form title="특징" className="col-span-2">
                                <Input />
                            </Form>
                        </div>
                    </Form>
                </div>
                <div>
                    <Form title="위치"></Form>
                </div>
                <div>
                    <Form title="태그">
                        <div className="flex items-center gap-2">
                            <Input placeholder="태그를 입력해주세요" /> <Button>추가</Button>
                        </div>
                    </Form>
                </div>
            </div>
            <div className="sticky right-0 bottom-0 left-0 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div className="flex gap-2">
                    <Button className="flex-1">게시글 등록하기</Button>
                </div>
            </div>
        </div>
    );
};

export default MissingWritePage;
