import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ResponserForm from '../components/ResponserForm';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Alyo Initial Responser</title>
        <meta name="description" content="Initial responser for Alyo Support" />
      </Head>
      <ResponserForm />
    </div>
  )
}
