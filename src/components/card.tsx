import React, { useState, useEffect } from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Link from 'next/link';


interface CardData {
  id: number;
  title: string;
  description: string;
  thumbsUp: number;
  thumbsDown: number;
  timestamp: string; // Now only contains the date portion
}

// Dummy initial card data
const initialCards = [
  {
    title: 'Card Title 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    thumbsUp: 0,
    thumbsDown: 0,
    timestamp: ''
  },
  {
    title: 'Card Title 2',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    thumbsUp: 0,
    thumbsDown: 0,
    timestamp: ''
  },
  {
    title: 'Card Title 3',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    thumbsUp: 0,
    thumbsDown: 0,
    timestamp: ''
  },
  {
    title: 'Card Title 4',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    thumbsUp: 0,
    thumbsDown: 0,
    timestamp: ''
  },
  {
    title: 'Card Title 5',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    thumbsUp: 0,
    thumbsDown: 0,
    timestamp: ''
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

// Generate timestamps for each card as a date string (without time)
const generateTimestamps = (count: number): string[] => {
  const timestamps = [];
  for (let i = 0; i < count; i++) {
    const date = new Date();
    timestamps.push(date.toLocaleDateString()); // Only show the date portion (no time)
  }
  return timestamps;
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

// IndexedDB utility functions
const openDB = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('cardDatabase', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target as IDBRequest;
      const database = db.result;
      if (!database.objectStoreNames.contains('cards')) {
        database.createObjectStore('cards', { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBRequest).result);
    };

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };
  });
};

const getIdsAndTimestampsFromDB = async () => {
  const db = await openDB();
  return new Promise<{ ids: number[], timestamps: string[] }>((resolve, reject) => {
    const transaction = db.transaction('cards', 'readonly');
    const store = transaction.objectStore('cards');
    const request = store.getAll();

    request.onsuccess = (event) => {
      const result = (event.target as IDBRequest).result;
      const ids = result.map((card: any) => card.id);
      const timestamps = result.map((card: any) => card.timestamp);
      resolve({ ids, timestamps });
    };

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };
  });
};

const saveIdsAndTimestampsToDB = async (ids: number[], timestamps: string[]) => {
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction('cards', 'readwrite');
    const store = transaction.objectStore('cards');
    for (let i = 0; i < ids.length; i++) {
      store.put({ id: ids[i], timestamp: timestamps[i] });
    }

    transaction.oncomplete = () => {
      resolve();
    };

    transaction.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };
  });
};

const Message: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredCards, setFilteredCards] = useState<CardData[]>([]);

  // Use debounced searchQuery for better performance
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const initializeCards = async () => {
      try {
        const { ids, timestamps } = await getIdsAndTimestampsFromDB();
        let newIds: number[] = [];
        let newTimestamps: string[] = [];

        if (ids.length > 0) {
          // Ensure we have the correct number of IDs and timestamps for the cards
          newIds = ids.length === initialCards.length ? ids : [...ids, ...generateCardIds(initialCards.length - ids.length)];
          newTimestamps = timestamps.length === initialCards.length ? timestamps : [...timestamps, ...generateTimestamps(initialCards.length - timestamps.length)];
          await saveIdsAndTimestampsToDB(newIds, newTimestamps);
        } else {
          newIds = generateCardIds(initialCards.length);
          newTimestamps = generateTimestamps(initialCards.length);
          await saveIdsAndTimestampsToDB(newIds, newTimestamps);
        }

        const cardsWithIdsAndTimestamps = initialCards.map((card, index) => ({
          ...card,
          id: newIds[index],
          timestamp: newTimestamps[index] || new Date().toLocaleDateString() // Ensure timestamp is populated as date-only
        }));

        setCards(cardsWithIdsAndTimestamps);
        setFilteredCards(cardsWithIdsAndTimestamps);
      } catch (error) {
        console.error('Error with IndexedDB', error);
        // Fallback: Generate card IDs and timestamps directly if there's an error
        const newIds = generateCardIds(initialCards.length);
        const newTimestamps = generateTimestamps(initialCards.length);
        const cardsWithIdsAndTimestamps = initialCards.map((card, index) => ({
          ...card,
          id: newIds[index],
          timestamp: newTimestamps[index] // Ensure timestamp is populated as date-only
        }));
        setCards(cardsWithIdsAndTimestamps);
        setFilteredCards(cardsWithIdsAndTimestamps);
      }
    };

    initializeCards();
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

  const handleThumbsUp = (id: number) => {
    setCards(cards => cards.map(card => card.id === id ? { ...card, thumbsUp: card.thumbsUp + 1 } : card));
  };

  const handleThumbsDown = (id: number) => {
    setCards(cards => cards.map(card => card.id === id ? { ...card, thumbsDown: card.thumbsDown + 1 } : card));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title or ID"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="mb-6 p-2 border rounded text-black"
      />
      {filteredCards.map((card) => (
        <div key={card.id} className="bg-white p-6 rounded-lg shadow-black-xl mb-8">
          <h2 className="text-xl font-bold mb-2 text-black">{card.title} (ID: {card.id}) <Link href="https://www.youtube.com/"> <YouTubeIcon className=" text-red-400 hover:text-red-900" /></Link> </h2>
          <p className="text-black">{card.description} </p>
          <div className="flex justify-star"> 
        <Link href=""> 
      <button className="bg-gray-800 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded">Read More</button> 
      </Link> 
      </div> 
         
          <div className="flex space-x-1 mt-4 bg-white p-6 rounded-lg shadow-lg mb-8">
            <button
              className="bg-transparent border-0 text-green-500 px-2 py-2 rounded-lg hover:text-green-700"
              onClick={() => handleThumbsUp(card.id)}
            >
              <span role="img" aria-label="thumbs up" className="opacity-50">👍 {card.thumbsUp}</span>
            </button>
            <button
              className="bg-transparent border-0 text-red-500 px-2 py-2 rounded-lg hover:text-red-700"
              onClick={() => handleThumbsDown(card.id)}
            >
              <span role="img" aria-label="thumbs down" className="opacity-50">👎 {card.thumbsDown}</span>
              
            </button>
            
           
          </div>
          <p className="text-black"> {card.timestamp}</p> {/* Display only the date */}
        </div>
      ))}
    </div>
  );
};

export default Message;
