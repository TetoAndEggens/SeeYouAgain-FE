import { checkLoginId } from '@/api/auth';
import { useState } from 'react';

export const useSignupValidation = () => {
    const [errors, setErrors] = useState({
        loginId: '',
        password: '',
        passwordConfirm: '',
        nickName: '',
        phoneNumber: '',
    });

    const setError = (field: string, message: string) => {
        setErrors((prev) => ({ ...prev, [field]: message }));
    };

    const clearError = (field: string) => {
        setErrors((prev) => ({ ...prev, [field]: '' }));
    };

    // 아이디 검증 (4-20자, 영문+숫자)
    const validateLoginId = (loginId: string): boolean => {
        if (loginId.length < 4 || loginId.length > 20) {
            setError('loginId', '아이디는 4-20자여야 합니다');
            return false;
        }
        if (!/^[a-zA-Z0-9]+$/.test(loginId)) {
            setError('loginId', '아이디는 영문과 숫자만 가능합니다');
            return false;
        }
        clearError('loginId');
        return true;
    };

    const checkDupLoginId = async (loginId: string) => {
        try {
            await checkLoginId(loginId);
            clearError('loginId');
            return true;
        } catch (error: any) {
            if (error.response?.status === 409) {
                setError('loginId', '이미 사용 중인 아이디입니다');
            } else {
                setError('loginId', '중복 확인에 실패했습니다');
            }
            return false;
        }
    };

    // 비밀번호 검증 (8자 이상, 영문+숫자+특수문자)
    const validatePassword = (password: string): boolean => {
        if (password.length < 8) {
            setError('password', '비밀번호는 8자 이상이어야 합니다');
            return false;
        }
        if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/.test(password)) {
            setError('password', '영문, 숫자, 특수문자를 포함해야 합니다');
            return false;
        }
        clearError('password');
        return true;
    };

    // 비밀번호 확인 검증
    const validatePasswordConfirm = (confirm: string, password: string): boolean => {
        if (confirm !== password) {
            setError('passwordConfirm', '비밀번호가 일치하지 않습니다');
            return false;
        }
        clearError('passwordConfirm');
        return true;
    };

    // 닉네임 검증 (2-10자)
    const validateNickName = (nickName: string): boolean => {
        if (nickName.length < 2 || nickName.length > 10) {
            setError('nickName', '닉네임은 2-10자여야 합니다');
            return false;
        }
        clearError('nickName');
        return true;
    };

    // 전화번호 검증 (숫자만, 10-11자)
    const validatePhoneNumber = (phoneNumber: string): boolean => {
        if (!/^\d{10,11}$/.test(phoneNumber)) {
            setError('phoneNumber', '올바른 전화번호 형식이 아닙니다');
            return false;
        }
        clearError('phoneNumber');
        return true;
    };

    return {
        errors,
        validateLoginId,
        validatePassword,
        validatePasswordConfirm,
        validateNickName,
        validatePhoneNumber,
        checkDupLoginId,
    };
};
