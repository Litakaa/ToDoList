import React, {useState} from 'react';
import addSvg from "../../assets/img/add.svg";
import './Tasks.scss'
import axios from "axios";

const AddTaskForm = ({list, onAddTask}) => {
    const [visibleForm, setVisibleForm] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toggleFormVisible = () => {
        setVisibleForm(!visibleForm);
        setInputValue('');
    }
    const onInputChange = (e) => {
        setInputValue(e.target.value);
    }
    const addTask = () => {
        const taskObj = {
            listId: list.id,
            text: inputValue,
            completed: false
        };
        setIsLoading(true);
        axios
            .post('http://localhost:3001/tasks', taskObj ).then(({ data }) => {
                console.log(data)
                onAddTask(list.id, data);
                toggleFormVisible();
                })
            .catch(() => {
                alert('Ошибка при добавлении задачи!')
            })
            .finally(() => {
            setIsLoading(false);
        })
        }

    return (
        <div className="tasks__form">
            {!visibleForm ? (
                <div onClick={toggleFormVisible} className="tasks__form-new">
                    <img src={addSvg} alt="Add icon"/>
                    <span>Новая задача</span>
                </div>
            ) : (
                <div className="tasks__form-block">
                    <input  value={inputValue}
                            className="field"
                            type="text"
                            placeholder="Текст задачи"
                            onChange={onInputChange}
                    />
                    <button disabled={isLoading} onClick={addTask} className="button">
                        {isLoading ? "Идет добавление задачи..." : "Добавить"}
                    </button>
                    <button onClick={toggleFormVisible} className="button button--grey">Отмена</button>
                </div>
            )}
        </div>
    );
};

export default AddTaskForm;