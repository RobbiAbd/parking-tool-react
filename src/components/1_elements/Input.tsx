import {ClassValue} from 'clsx';
import {cn} from '../../@utils/utils';

type Props = {
    id?: string;
    className?: ClassValue;
    value: string;
    setValue: (value: string) => void;
    placeholder: string;
    readOnly?: boolean;
};

export default function Input({
                                  id,
                                  className,
                                  value,
                                  setValue,
                                  placeholder,
                                  readOnly = false, // default to false if not provided
                              }: Props) {
    return (
        <input
            className={cn(
                'rounded-base border-2 p-[10px] font-base ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 outline-none',
                {
                    'bg-white dark:bg-secondaryBlack border-border dark:border-darkBorder': !readOnly,
                    'bg-gray-300 dark:bg-gray-600 border-gray-400 dark:border-gray-500 cursor-not-allowed': readOnly,
                },
                className
            )}
            id={id}
            type="text"
            name="text"
            readOnly={readOnly}
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
                if (!readOnly) {
                    setValue(e.target.value);
                }
            }}
            aria-label={placeholder}
        />
    );
}
