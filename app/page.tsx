'use client' // 👈 use it here

import { useEffect, useState } from 'react';

export default function Home() {
  const [exchangesInfo, setExchangesInfo] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const query = await fetch(
          'https://api.coingecko.com/api/v3/exchanges/?per_page=<itemsPorPagina>&page=<pageIndex>'
        );
        const response = await query.json();
        console.log('response from api', response);
        setExchangesInfo(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, []);

  return (
    <main>
      <header className='flex flex-col max-xl:'>
        <div className='flex justify-between m-4'>
          <button className='border rounded p-3' id='prev'>Página Anterior</button>
          <button className='border rounded p-3'id='next'>Próxima Página</button>
        </div>
        <input className='m-4 p-4' type="search" placeholder='Filtrar por nome'/>
      </header>

      <section>
        {exchangesInfo.map(exchange => (
          <div className='grid m-6 p-6 gap-4 border rounded' key={exchange.id}>
            <div className='flex gap-3 align-middle'>
              <img src={exchange.image} alt="" />
              <h2>{exchange.name}</h2>
            </div>
            <div className='flex flex-col'>
              <div><span>Ano de Criação: </span> <strong>{exchange.year_established}</strong></div>
              <div><span>País: </span> <strong>{exchange.country}</strong></div>
              <div><span>Pontuação de Confiança: </span> <strong>{exchange.trust_score_rank}</strong></div>
              <div><span>Volume de Trade (24 horas): </span> <strong>{exchange.trade_volume_24h_btc}</strong></div>
            </div>
          </div>
        ))}
      </section>
    </main>
    
  );
}