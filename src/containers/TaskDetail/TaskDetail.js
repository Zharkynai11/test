import React, {Component} from 'react'
import {TASKS_URL} from "../../api-urls";
import {NavLink} from "react-router-dom";
//import TaskCategories from "../../components/TaskCategories/TaskCategories";
import axios from 'axios';


// компонент, который выводит одну карточку с фильмом
// фильм также загружается при выводе компонента на экран (mount),
// а не при обновлении (didUpdate), т.к. компонент выводится на отдельной странице,
// и при переключении страниц исчезает с экрана, а потом снова маунтится.
class TaskDetail extends Component {
    state = {
        task: null
    };
/*
    componentDidMount() {

        // match - атрибут, передаваемый роутером, содержащий путь к этому компоненту
        const match = this.props.match;
        // match.params - переменные из пути (:id)
        // match.params.id - значение переменной, обозначенной :id в свойстве path Route-а.
        axios.get(TASKS_URL + match.params.id)
            .then(response => {console.log(response.data); return response.data;})
            .then(task => this.setState({task}))
            .catch(error => console.log(error));
    }*/
    componentDidMount() {
            axios.get(TASKS_URL)
                .then(response => {console.log(response.data); return response.data;})
                .then(tasks => {
                    for (let i of tasks){
                        if (i.id == this.props.match.params.id){
                            this.setState({task: i})
                            alert(i.summary);
                        }
                    }
                })
                .catch(error => console.log(error));
        }
    render() {
        // если task в state нет, ничего не рисуем.
        if (!this.state.task) return null;
        // достаём данные из task
        const {summary, description, due_date, status, time_planned} = this.state.task;

        return <div>

            {/* название фильма */}
            <h1>{summary}</h1>

            {/* категории, если указаны */}
            <p>{status}</p>

            {/* даты проката c: по: (если указано)*/}
            <p className="text-secondary">В прокате c: {due_date} до: {time_planned ? time_planned : "Неизвестно"}</p>
            {description ? <p>{description}</p> : null}

            {/* назад */}
            <NavLink to='' className="btn btn-primary">tasks</NavLink>
        </div>;
    }
}


export default TaskDetail;
