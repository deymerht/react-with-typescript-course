'use client'
import { useState } from 'react';
import { type MouseEventHandler } from 'react';
import { LazyImage } from './components/RandomFox';
import { LazyImageProps } from './models/Image-model';

const random = (): number => Math.floor(Math.random() * 123) + 1;
const generateId = (): string => (Math.random().toString(36).substr(2, 9));
// const image = `https://randomfox.ca/images/${random()}.jpg`;

export default function Home() {
  const [images, setImages] = useState<Array<LazyImageProps>>([]);

  const addNewFox: MouseEventHandler<HTMLButtonElement> = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    event.preventDefault();
    const newItem: LazyImageProps = { id: generateId(), src: `https://randomfox.ca/images/${random()}.jpg` };
    setImages([...images, newItem]);
  }

  return <div>
    <div style={{ textAlign: 'center', padding: 10 - 0 }}>
      <button className='bg-highlight rounded-lg p-5 text-center text-blanchedalmond' onClick={addNewFox}>Add new image</button>
    </div>
    <hr />
    {
      images.map(({ id, src }, index) => (
        <div key={id} className='p-4'>
          <LazyImage
            src={src}
            alt='Fox'
            onClick={() => console.log('Hola...')}
            width={320}
            height='auto'
            className='rounded bg-gray-300'
            onLazyLoad={(img) => {
              console.log(`Image #${index + 1} cargada. Nodo:`, img);
            }}
          />
        </div>
      ))
    }
  </div>
}
