import React, {Component} from 'react';
import {TASKS_URL} from "../../api-urls";

// из библиотеки react-datepicker
// стили для дэйтпикера подключены в index.js! без них он не работает!
import DatePicker from "react-datepicker";
// из библиотеки react-select
import Select from 'react-select';

import axios from 'axios';


class taskAdd extends Component {
    state = {
        // фильм, который мы редактируем
        task: {
            summary: "",
            description: "",
            due_date: "",
            status: "",
            time_planned: "",
        },

        // доступные категории
        statuses: [ "Очередь", "В работе", "Сделано"],
        // сообщение об ошибке
        alert: null,

        // индикатор отключения кнопки submit, если запрос выполняется
        submitDisabled: false
    };

    // функция, обновляющая поля в this.state.task
    updatetaskState = (fieldName, value) => {
        this.setState(prevState => {
            let newState = {...prevState};
            let task = {...prevState.task};
            task[fieldName] = value;
            newState.task = task;
            return newState;
        });
    };

    // обработчик ввода в поля ввода
    inputChanged = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        this.updatetaskState(fieldName, value);
    };

    // обработчик изменения дат
    dateChanged = (field, date) => {
        this.updatetaskState(field, date.toISOString().slice(0, 10));
    };

    // обработчик изменения select
    selectChanged = (field, values) => {
        const status_ids = values.map(item => item.value);
        this.updatetaskState(field, status_ids);
    };

    // обработчик отправки формы
    formSubmitted = (event) => {
        event.preventDefault();

        // блокировка отправки формы на время выполнения запроса
        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitDisabled = true;
            return newState;
        });

        // отправка запроса
        axios.post(TASKS_URL, this.state.task)
            .then(response => {
                console.log(response.data);
                if (response.status === 201) return response.data;
                throw new Error('task was not created');
            })
            // если всё успешно, переходим на просмотр страницы фильма с id,
            // указанным в ответе
            .then(task => this.props.history.replace('/tasks/' + task.id))
            .catch(error => {
                console.log(error);
                this.setState(prevState => {
                    let newState = {...prevState};
                    newState.alert = {type: 'danger', message: `task was not added!`};
                    newState.submitDisabled = false;
                    return newState;
                });
            });
    };

    render() {
        // распаковка данных фильма, чтобы было удобнее к ним обращаться
        const {summary, description, due_date, status, time_planned} = this.state.task;

        // создание разметки для алерта, если он есть
        let alert = null;
        if (this.state.alert) {
            alert = <div className={"alert alert-" + this.state.alert.type}>{this.state.alert.message}</div>
        }

        // форматирование дат для DatePicker'ов
        const due_date_selected = due_date ? new Date(due_date) : null;
        const time_planned_selected = time_planned ? new Date(time_planned) : null;

        // сборка опций для селекта с категориями.
        const select_options = this.state.statuses.map(statuses => {
            return {value: status, label: status}
        });

        return <div>
            {alert}
            <form onSubmit={this.formSubmitted}>
                <div className="form-group">
                    <label className="font-weight-bold">Название</label>
                    <input type="text" className="form-control" name="summary" value={summary} onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label>Описание</label>
                    <input type="text" className="form-control" name="description" value={description}
                           onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label className="font-weight-bold">Дата выхода</label>
                    <div>
                        <DatePicker dateFormat="yyyy-MM-dd" selected={due_date_selected} className="form-control"
                                    name="due_date" onChange={(date) => this.dateChanged('due_date', date)}/>
                    </div>
                </div>
                <div className="form-group">
                    <label>Дата завершения проката</label>
                    <div>
                        <DatePicker dateFormat="yyyy-MM-dd" selected={time_planned_selected} className="form-control"
                                    name="time_planned" onChange={(date) => this.dateChanged('time_planned', date)}/>
                    </div>
                </div>
                <div className="form-group">
                    <label>Категории</label>
                    <Select options={select_options} isMulti={true} name='statuses'
                            onChange={(values) => this.selectChanged('statuses', values)}/>
                </div>
                <button disabled={this.state.submitDisabled} type="submit"
                        className="btn btn-primary">Сохранить</button>
            </form>
        </div>;
    }
}


export default taskAdd;
