import React, { useState } from 'react'

export default function Categories() {
  const [activeCatigoties, setActiveCatigoties] = useState(0)
  const changeCategories = (index) => {
    setActiveCatigoties(index)
  }
  const categories = [
    {
      title: 'Все',
      index: 0
    },
    {
      title: 'Мясные',
      index: 1
    },
    {
      title: 'Вегетарианские',
      index: 2
    },
    {
      title: 'Гриль',
      index: 3
    },
    {
      title: 'Острые',
      index: 4
    },
    {
      title: 'Закрытые',
      index: 5
    }
  ];

  return (
    <div className="categories">
      <ul>
      {categories.map((category) => (
        <li onClick={() => changeCategories(category.index)} className={activeCatigoties == category.index ? 'active' : ''}>{category.title}</li>
      ))}
      </ul>
    </div>
  )
}
