import React, { useCallback, useRef, useState } from 'react';

export function useDrapDrop<T extends any>(initialState: T[]) {
    const [data, setData] = useState(initialState);
    const startRef = useRef('');

    const dragEnter = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        startRef.current = ((event.currentTarget as HTMLDivElement).dataset
            .index as any) as string;
    }, []);

    const dragEnd = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        const draggedIndex = ((event.currentTarget as HTMLDivElement).dataset
            .index as any) as string;
        if (draggedIndex === startRef.current || !startRef.current) {
            startRef.current = ''; // restore
            return;
        }
        setData(prevData => {
            const newData = [...prevData];
            // move down
            if (draggedIndex < startRef.current) {
                // Insert after startRef.current
                newData.splice(+startRef.current + 1, 0, newData[+draggedIndex]);
                newData.splice(+draggedIndex, 1); // No effect for all of previous index
            }

            // move up
            if (draggedIndex > startRef.current) {
                newData.splice(+startRef.current, 0, newData[+draggedIndex]);
                newData.splice(+draggedIndex + 1, 1); // No effect for all of latter index
            }

            return newData;
        });
    }, []);

    const onDelete = useCallback(
        (index: number) =>
            setData(prevData => {
                const newData = [...prevData];
                newData.splice(index, 1);
                return newData;
            }),
        []
    );

    const onUp = useCallback((index: number) => {
        if (index === 0) {
            return;
        }

        setData(prevData => {
            const newData = [...prevData];
            // swap
            const currentIndexValue = newData[index];
            const prevIndexValue = newData[index - 1];
            newData[index] = prevIndexValue;
            newData[index - 1] = currentIndexValue;

            return newData;
        });
    }, []);

    const onDown = useCallback(
        (index: number) =>
            setData(prevData => {
                if (index === prevData.length - 1) {
                    return prevData;
                }
                const newData = [...prevData];
                // swap
                const currentIndexValue = newData[index];
                const nextIndexValue = newData[index + 1];
                newData[index] = nextIndexValue;
                newData[index + 1] = currentIndexValue;

                return newData;
            }),
        []
    );

    return { data, dragEnter, dragEnd, onDelete, onUp, onDown } as const;
}
