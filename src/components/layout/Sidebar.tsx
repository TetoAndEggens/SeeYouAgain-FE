'use client';

import React from 'react';
import { useSidebarStore } from '@/store/sidebar';
import { Slider } from 'radix-ui';

export default function Sidebar() {
    const { isOpen } = useSidebarStore();

    return <div></div>;
}
