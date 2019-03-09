import React from 'react';
import Card from "../UI/Card/Card";


// Компонент, который рисует карточку для фильма: постер, название и ссылку,
// используя компонент UI/Card (карточка), основанный на стилях bootstrap.
const TaskCard = props => {
    const {task, className} = props;

    // достаём данные из movie
    const {summary, description, due_date, status, time_planned,id} = task;

    // создаём объект с данными (текстом и url) для ссылки
    const link = {
        text: 'Read more',
        url: '/tasks/' + id
    };

    // возвращаем (рисуем) карточку с данными из movie и ссылкой.
    return <Card header={summary}  description={description} due_date = {due_date} status={status} time_planned={time_planned} link={link} className='h-100'/>;
};


export default TaskCard;
