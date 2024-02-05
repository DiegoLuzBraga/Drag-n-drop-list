import type { FC } from 'react'
import { useCallback, useEffect, useState } from 'react'
import update from 'immutability-helper'

import { Card } from '../Card'
import { Data } from '../../types/data'
import { tasks } from '../../consts/data'
import * as S from './style';
import { getDataFromFakeApi } from '../../api/getDataFromFakeApi'

export const Container: FC = () => {
    const [cards, setCards] = useState<Data[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const callApi = async () => {
        await getDataFromFakeApi();
        setCards(tasks);
        setIsLoading(false);
    };
    useEffect(() => {
        callApi();
    }, []);

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        setCards((prevCards: Data[]) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]],
                ],
            }),
        )
    }, []);

    const renderCard = useCallback(
        (card: Data, index: number) => {
            return (
                <Card
                    {...card}
                    key={card.id}
                    index={index}
                    moveCard={moveCard}
                />
            )
        },
        [],
    )

    if (isLoading) {
        return <div>...loading</div>;
    }

    return (
        <S.Container>{cards.map((card, i) => renderCard(card, i))}</S.Container>
    );
}
