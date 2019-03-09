import React from 'react';
import Card from "../UI/Card/Card";


// Компонент, который рисует карточку для фильма: постер, название и ссылку,
// используя компонент UI/Card (карточка), основанный на стилях bootstrap.
const MovieCard = props => {
    const {movie, className} = props;

    // достаём данные из movie
    const {summary, description, due_date, status, time_planned,id} = movie;

    // создаём объект с данными (текстом и url) для ссылки
    const link = {
        text: 'Read more',
        url: '/tasks/' + id
    };

    // возвращаем (рисуем) карточку с данными из movie и ссылкой.
    return <Card header={summary}  link={link} className='h-100'/>;
};


export default MovieCard;
