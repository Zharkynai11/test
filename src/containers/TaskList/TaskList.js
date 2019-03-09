import React, {Fragment, Component} from 'react'
import {TASKS_URL} from "../../api-urls";
import TaskCard from "../../components/TaskCard/TaskCard";
import {NavLink} from "react-router-dom";
import axios from 'axios';


// компонент для показа списка фильмов клиенту
// фильмы запрашиваются из API в момент показа компонента на странце (mount)
class TaskList extends Component {
    state = {
        tasks: [],
    };

    componentDidMount() {
        axios.get(TASKS_URL)
            .then(response => {console.log(response.data); return response.data;})
            .then(tasks => this.setState({tasks}))
            .catch(error => console.log(error));
    }

    render() {
        return <Fragment>
            <p><NavLink to='/tasks/add'>Добавить фильм</NavLink></p>
            <div className='row'>
                {this.state.tasks.map(task => {
                    return <div className='col-xs-12 col-sm-6 col-lg-4 mt-3'  key={task.id}>
                        <TaskCard task={task}/>
                    </div>
                })}
            </div>
        </Fragment>
    }
}


export default TaskList;