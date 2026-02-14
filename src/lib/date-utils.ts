/**
 * 출생 연도로 한국식 나이를 계산합니다.
 * @param birthYear - 출생 연도
 * @returns 현재 연도 기준 한국식 나이
 */
export function calculateAgeFromYear(birthYear: number): number {
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear + 1;
}

/**
 * 출생일로 만 나이를 계산합니다.
 * @param birthDate
 * @returns 만 나이
 */
export function calculateAge(birthDate: Date | string): number {
    const birth = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    // 생일이 아직 지나지 않았으면 나이를 1 줄입니다.
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age;
}
