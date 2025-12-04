import { fetchSocialTempInfo } from '@/api/auth';
import { useEffect, useState } from 'react';

export const useSocialSignup = () => {
    const [isSocialSignup, setIsSocialSignup] = useState(false);
    const [tempUuid, setTempUuid] = useState<string | undefined>(undefined);

    useEffect(() => {
        const checkSocialSignup = async () => {
            try {
                const { data } = await fetchSocialTempInfo();
                setIsSocialSignup(true);
                setTempUuid(data.tempUuid);
            } catch (error) {
                // 실패 (401) → 일반 회원가입
                setIsSocialSignup(false);
            }
        };

        checkSocialSignup();
    }, []);

    return { isSocialSignup, tempUuid };
};
