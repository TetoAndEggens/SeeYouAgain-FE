/**
 * ��D�| �%D � �t| İi��.
 * @param birthYear - ��D� (: 2025)
 * @returns � �t (�� (t)
 */
export function calculateAgeFromYear(birthYear: number): number {
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear + 1;
}

/**
 * �D�|D �%D U\ � �t| İi��.
 * @param birthDate - �D�| (Date � � ISO 8��)
 * @returns � �t
 */
export function calculateAge(birthDate: Date | string): number {
    const birth = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    // �|t D� H ��<t -1
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age;
}
