import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const tagVariants = cva(
    'inline-flex items-center rounded-full px-2 py-1', // 기본 스타일
    {
        variants: {
            variant: {
                default: 'bg-primary-light text-primary-dark',
                missing: 'bg-destructive-light text-destructive py-0.5 rounded-[0.5rem]',
                sighting: 'bg-accent-light text-accent py-0.5 rounded-[0.5rem]',
            },
            size: {
                sm: 'text-[0.75rem]',
                lg: 'text-[1rem]',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'sm',
        },
    }
);
interface TagProps {
    /**
     * 태그에 표시할 텍스트
     * @example "실종" | "목격"
     */
    children: string;

    /**
     * 추가 CSS 클래스명 (Tailwind)
     * @example "ml-2" | "font-bold"
     */
    className?: string;

    /**
     * 태그 크기
     * @default "sm"
     */
    size?: 'sm' | 'lg';

    /**
     * 태그 색상 스타일
     * - `default`: 기본 프라이머리 색상
     * - `missing`: 실종 표시 (빨간색)
     * - `sighting`: 목격 표시 (파란색)
     * @default "default"
     */
    variant?: 'default' | 'missing' | 'sighting';
}

/**
 * 태그 컴포넌트
 *
 * 라벨, 카테고리, 상태를 표시하는 작은 배지 형태의 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <Tag>기본 태그</Tag>
 * <Tag variant="missing">실종</Tag>
 * <Tag variant="sighting" size="lg">목격</Tag>
 * ```
 */
function Tag({ children, className, size, variant }: TagProps) {
    return <div className={cn(tagVariants({ variant, size, className }))}>{children}</div>;
}

export default Tag;
