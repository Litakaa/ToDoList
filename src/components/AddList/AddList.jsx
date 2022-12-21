import React, {useEffect, useState} from 'react';
import List from "../List/List";
import './AddList.scss';
import Badge from "../Badge/Badge";
import closeSvg from "../../assets/img/close.svg";
import axios from "axios";


const AddList = ({colors, onAdd}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, setSelectColor] = useState(3);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (Array.isArray(colors)) {
            setSelectColor(colors[0].id);
        }
    }, [colors]);


    const onListClick = () => {
        setVisiblePopup(true);
    }
    const onInputChange = (e) => {
        setInputValue(e.target.value);
    }
    const onClose = () => {
        setVisiblePopup(false);
        setInputValue('');
        setSelectColor(colors[0].id);
    }

    const addList = () => {
        if (!inputValue) {
            alert('Введите название списка');
            return;
        }
        setIsLoading(true);
        axios.post('http://localhost:3001/lists', {  name: inputValue, colorId: selectedColor })
            .then( ({data}) => {
                const color = colors.filter(c => c.id === selectedColor)[0].name;
                const listObj = { ...data, color: { name: color } };
                onAdd(listObj);
                onClose();
            })
            .finally(() => {
                setIsLoading(false);
        })

        }

    return (
        <div className="add-list">
            <List
                onClick = {onListClick}
                items={[
                {
                    className: "list__add-button",
                    icon: <svg width="12"
                               height="12"
                               viewBox="0 0 16 16"
                               fill="none"
                               xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8 1V15"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M1 8H15"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>,
                    name: 'Добавить список'
                }
            ]}
            />

            { visiblePopup && (
                <div className="add-list__popup">
                    <img
                        onClick={onClose}
                        src={closeSvg}
                        alt="Close button"
                        className="add-list__popup-close-btn"
                    />

                    <input value={inputValue}
                           onChange={onInputChange}
                           className="field"
                           type="text"
                           placeholder="Название списка"
                    />

                    <div className="add-list__popup-colors">
                        {
                            colors.map((color) => (
                                <Badge
                                    onClick = {() => setSelectColor(color.id)}
                                    key = {color.id}
                                    color={color.name}
                                    className = {selectedColor === color.id && "active"}
                                />
                            ))
                        }
                    </div>
                    <button onClick={addList} className="button">
                        {isLoading ? "Идет добавление..." : "Добавить"}
                    </button>
                </div>
            ) }

        </div>

    );
};

export default AddList;