import {useEffect, useState} from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [refreshInterval, setRefreshInterval] = useState(10000);
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('https://coolproject.onrender.com/events/1/photo')
        .then(response => response.json())
        .then(data => {
          console.log('data: ', data);
          // id: number
          // refreshIntervalMilliseconds: number
          // url: string
          setRefreshInterval(data.refreshIntervalMilliseconds);
          setPhotoUrl(data.url);
        })
        .catch(error => {
          console.log('error: ', error);
        });

      console.log('next request');

    }, refreshInterval);

    return () => {
      clearInterval(interval);
    }
  }, [refreshInterval]);

  return (
    <div className={styles.container}>
      {photoUrl &&
        <Image
          src={photoUrl}
          alt="Landscape picture"
          layout='fill'
        />
      }
    </div>
  )
}

// "https://cdn.wallpapersafari.com/17/19/KXJzAU.jpg"
