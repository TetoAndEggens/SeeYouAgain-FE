import react from 'react';
import { InformationDetail } from '@/components/layout/InformationDetail';
import { Tag } from '@/components/layout/Tag';
import { cn } from '@/lib/utils';

interface FormProps {
    title: String;
    element?: { title: String; context: String }[];
    tag?: String[];
    className?: string;

    // InformationDetail Props
    infoClassName?: string;
    infoTitleClassName?: string;
    infoContextClassName?: string;
    infoContainerProps?: React.HTMLAttributes<HTMLDivElement>;
}

export function Form({
    title,
    element,
    tag,
    className,
    infoClassName,
    infoTitleClassName,
    infoContextClassName,
    infoContainerProps,
}: FormProps) {
    return (
        <div
            className={cn('mb-5 w-full shrink-0 rounded-lg border border-gray-300 p-2', className)}
        >
            <p className="text-lg font-bold">{title}</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
                {element?.map((item, index) => {
                    return (
                        <InformationDetail
                            key={index}
                            index={index}
                            item={item}
                            className={infoClassName}
                            titleClassName={infoTitleClassName}
                            contextClassName={infoContextClassName}
                            containerProps={infoContainerProps}
                        />
                    );
                })}
            </div>
            <div className="overflow-hidden pt-2 whitespace-nowrap">
                {tag?.map((item, index) => {
                    return <Tag key={index} index={index} item={item} />;
                })}
            </div>
        </div>
    );
}
