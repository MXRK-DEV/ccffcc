// import React, { useState, useEffect } from 'react';

// interface CardData {
//   id: number;
//   title: string;
//   description: string;
// }

// const initialCards = [
//   {
//     title: 'Card Title 1',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//   },
//   {
//     title: 'Card Title 2',
//     description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//   },
//   {
//     title: 'Card Title 3',
//     description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//   },
//   {
//     title: 'Card Title 4',
//     description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//   },
//   {
//     title: 'Card Title 5',
//     description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//   },
//   {
//     title: 'Card Title 6',
//     description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//   },
//   {
//     title: 'Card Title 7',
//     description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//   },
// ];

// const generateCardIds = (count: number): number[] => {
//   const ids = [];
//   for (let i = 0; i < count; i++) {
//     ids.push(Math.floor(Math.random() * 1000) + 1);
//   }
//   return ids;
// };

// const Message: React.FC = () => {
//   const [cards, setCards] = useState<CardData[]>([]);
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [filteredCards, setFilteredCards] = useState<CardData[]>([]);

//   useEffect(() => {
//     const storedIds = localStorage.getItem('cardIds');
//     let newIds: number[];

//     if (storedIds) {
//       const parsedIds: number[] = JSON.parse(storedIds);
//       newIds = parsedIds.length === initialCards.length
//         ? parsedIds
//         : [...parsedIds, ...generateCardIds(initialCards.length - parsedIds.length)];
//       localStorage.setItem('cardIds', JSON.stringify(newIds));
//     } else {
//       newIds = generateCardIds(initialCards.length);
//       localStorage.setItem('cardIds', JSON.stringify(newIds));
//     }

//     const cardsWithIds = initialCards.map((card, index) => ({
//       ...card,
//       id: newIds[index],
//     }));

//     setCards(cardsWithIds);
//     setFilteredCards(cardsWithIds);
//   }, []);

//   useEffect(() => {
//     const query = searchQuery.toLowerCase();
//     const result = cards.filter(card =>
//       card.title.toLowerCase().includes(query) || card.id.toString().includes(query)
//     );
//     setFilteredCards(result);
//   }, [searchQuery, cards]);

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search by title or ID"
//         value={searchQuery}
//         onChange={e => setSearchQuery(e.target.value)}
//         className="mb-6 p-2 border rounded"
//       />
//       {filteredCards.map((card) => (
//         <div key={card.id} className="bg-white p-6 rounded-lg shadow-lg mb-8">
//           <h2 className="text-xl font-bold mb-2">{card.title} (ID: {card.id})</h2>
//           <p className="text-gray-700">{card.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Message;


import React, { useState, useEffect } from 'react';

interface CardData {
  id: number;
  title: string;
  description: string;
}

// Dummy initial card data (you can replace this with real data)
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
  // Add more cards as needed
];

// Generate random card IDs
const generateCardIds = (count: number): number[] => {
  const ids = [];
  for (let i = 0; i < count; i++) {
    ids.push(Math.floor(Math.random() * 1000) + 1);
  }
  return ids;
};

// Debounce hook to optimize search performance
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Message: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredCards, setFilteredCards] = useState<CardData[]>([]);

  // Use debounced searchQuery for better performance
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    try {
      const storedIds = localStorage.getItem('cardIds');
      let newIds: number[];

      if (storedIds) {
        const parsedIds: number[] = JSON.parse(storedIds);
        // Ensure we have the correct number of IDs for the cards
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
    } catch (error) {
      console.error('Error reading or writing to localStorage', error);
      // If there's an issue, fallback to generating card IDs directly
      const newIds = generateCardIds(initialCards.length);
      const cardsWithIds = initialCards.map((card, index) => ({
        ...card,
        id: newIds[index],
      }));
      setCards(cardsWithIds);
      setFilteredCards(cardsWithIds);
    }
  }, []);

  useEffect(() => {
    if (!debouncedSearchQuery) {
      setFilteredCards(cards);
      return;
    }

    const query = debouncedSearchQuery.toLowerCase();
    const result = cards.filter(
      card => card.title.toLowerCase().includes(query) || card.id.toString().includes(query)
    );
    setFilteredCards(result);
  }, [debouncedSearchQuery, cards]);

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
    <div className="flex space-x-1 mt-4">
      <button className="bg-transparent border-0 text-green-500 px-2 py-2 rounded-lg hover:text-green-700">
        <span role="img" aria-label="thumbs up" className="opacity-50">👍</span>
      </button>
      <button className="bg-transparent border-0 text-red-500 px-2 py-2 rounded-lg hover:text-red-700">
        <span role="img" aria-label="thumbs down" className="opacity-50">👎</span>
      </button>
    </div>
  </div>
))}


    </div>
  );
};

export default Message;

