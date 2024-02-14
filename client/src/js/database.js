import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // console.error('putDb not implemented');
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');

    // Add the content to the database
    const id = await store.add({ content });

    // Log the success message
    console.log(`Content added to the database with ID: ${id}`);

    // Complete the transaction
    await tx.done;
  } catch (error) {
    console.error('Error adding content to the database:', error);
  }
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // console.error('getDb not implemented');
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');

    // Get all content from the database
    const allContent = await store.getAll();

    // Log the retrieved content
    console.log('All content from the database:', allContent);

    // Complete the transaction
    await tx.done;

    return allContent;
  } catch (error) {
    console.error('Error getting content from the database:', error);
    return [];
  }
}

initdb();
