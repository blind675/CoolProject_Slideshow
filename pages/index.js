import {useEffect, useState} from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [refreshInterval, setRefreshInterval] = useState(1000);
  const [photoUrl, setPhotoUrl] = useState();
  const [remainingSeconds, setRemainingSeconds] = useState(0);

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

  useEffect(() => {
    const ticker = setInterval(() => {
      if (remainingSeconds < 2) {
        setRemainingSeconds(refreshInterval / 1000);
      } else {
        setRemainingSeconds(remainingSeconds - 1)
      }

    }, 1000);

    return () => {
      clearInterval(ticker);
    }
  }, [refreshInterval, remainingSeconds]);

  return (
    <div className={styles.container}>
      {photoUrl ? (
        <>
          <Image
            src={photoUrl}
            alt="Landscape picture"
            layout='fill'
          />
          <div className={styles.textOverContainer}><p className={styles.textOver}>{remainingSeconds}</p></div>
        </>
      ) : (
        <div className={styles.ldsRing}>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
        </div>
      )
      }
    </div>
  )
}
