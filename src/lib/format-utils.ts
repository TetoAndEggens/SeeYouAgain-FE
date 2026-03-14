export function formatSex(sex: 'M' | 'F' | 'Q' | undefined): string {
    if (!sex) return '불명';
    const sexMap = {
        M: '수컷',
        F: '암컷',
        Q: '불명',
    } as const;
    return sexMap[sex] ?? '불명';
}
