import styled from "styled-components";


export const Card = styled.div<{ isDragging: boolean }>`
    border: solid 1px white;
    border-radius: 8px;
    width: 200px;
    height: 200px;
    margin-bottom: 8px;
    opacity: ${props => props.isDragging ? '0.5' : '1' };
    padding: 8px 16px;
    background-color: white;
`;

export const Text = styled.p``;

export const Image = styled.img`
    width: 16px;
    height: 16px;
`;
