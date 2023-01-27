import React, { useState } from 'react'

export default function Categories() {
  const [activeCatigoties, setActiveCatigoties] = useState(0)
  
  const categories = [
    {
      title: 'Все',
      id: 0
    },
    {
      title: 'Мясные',
      id: 1
    },
    {
      title: 'Вегетарианские',
      id: 2
    },
    {
      title: 'Гриль',
      id: 3
    },
    {
      title: 'Острые',
      id: 4
    },
    {
      title: 'Закрытые',
      id: 5
    }
  ];

  return (
    <div className="categories">
      <ul>
      {categories.map((category) => (
        <li key={category.id} onClick={() => setActiveCatigoties(category.id)} className={activeCatigoties == category.id ? 'active' : ''}>{category.title}</li>
      ))}
      </ul>
    </div>
  )
}
