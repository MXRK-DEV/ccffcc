import React, { useState, useEffect } from 'react';

interface CardData {
  id: number;
  title: string;
  description: string;
}

const initialCards = [
  {
    title: 'Card Title 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Card Title 2',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    title: 'Card Title 3',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    title: 'Card Title 4',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    title: 'Card Title 5',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    title: 'Card Title 6',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    title: 'Card Title 7',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
];

const generateCardIds = (count: number): number[] => {
  const ids = [];
  for (let i = 0; i < count; i++) {
    ids.push(Math.floor(Math.random() * 1000) + 1);
  }
  return ids;
};

const Message: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredCards, setFilteredCards] = useState<CardData[]>([]);

  useEffect(() => {
    const storedIds = localStorage.getItem('cardIds');
    let newIds: number[];

    if (storedIds) {
      const parsedIds: number[] = JSON.parse(storedIds);
      newIds = parsedIds.length === initialCards.length
        ? parsedIds
        : [...parsedIds, ...generateCardIds(initialCards.length - parsedIds.length)];
      localStorage.setItem('cardIds', JSON.stringify(newIds));
    } else {
      newIds = generateCardIds(initialCards.length);
      localStorage.setItem('cardIds', JSON.stringify(newIds));
    }

    const cardsWithIds = initialCards.map((card, index) => ({
      ...card,
      id: newIds[index],
    }));

    setCards(cardsWithIds);
    setFilteredCards(cardsWithIds);
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const result = cards.filter(card =>
      card.title.toLowerCase().includes(query) || card.id.toString().includes(query)
    );
    setFilteredCards(result);
  }, [searchQuery, cards]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title or ID"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="mb-6 p-2 border rounded"
      />
      {filteredCards.map((card) => (
        <div key={card.id} className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-2">{card.title} (ID: {card.id})</h2>
          <p className="text-gray-700">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Message;
