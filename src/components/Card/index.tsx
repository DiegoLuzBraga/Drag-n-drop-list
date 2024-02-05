import React, { FC, useRef } from 'react';
import * as S from './style'
import { useDrag, useDrop } from 'react-dnd';
import { Data } from '../../types/data';
import type { Identifier, XYCoord } from 'dnd-core'

interface Props {
    title: string;
    description: string;
    imageURL: string;
    index: number;
    id: number;
    moveCard: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
    index: number;
    id: string;
    type: string;
}

export const Card: FC<Props> = ({ description, imageURL, title, id, index, moveCard }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [{ handlerId }, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: 'card',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            // Time to actually perform the action
            console.log('trying to move');
            moveCard(dragIndex, hoverIndex)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    });

    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: 'card',
            item: () => {
                return { id, index }
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging()
            })
        }),
        []
    );

    drag(drop(ref));

    return <S.Card ref={ref} isDragging={isDragging} data-handler-id={handlerId}>
        <S.Text>{title} - <S.Image src={imageURL} /></S.Text>
        <S.Text>{description}</S.Text>
    </S.Card>;
};