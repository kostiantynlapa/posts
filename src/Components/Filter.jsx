import React from 'react';
import MyInput from "../UI/inputs/MyInput";
import MySelect from "../UI/selects/MySelect";

const Filter = ({filter, setFilter}) => {


    return (
        <div>
            <MyInput
                value={filter.query}
                onChange={el => setFilter({...filter, query: el.target.value})}
                placeholder='Поиск'
            />
            <MySelect defaultValue='Сортировка'
                      value={filter.sort}
                      onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                      options = {[{
                          value: 'title', name: 'Заголовок'
                      }, {
                          value: 'body', name: 'Описание'
                      }]}
            />
        </div>
    );
};

export default Filter;