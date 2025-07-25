import { useEffect, useState } from 'react';
import type { Coin } from '../types';
import '..//styles/App.scss'

import Navbar from './components/Navbar/Navbar'
import AllCoins from './components/AllCoins/AllCoins';
import TabButtons from './components/TabsButtons/TabsButtons';
import FavoriteCoins from './components/FavoriteCoins/FavoriteCoins';



function App() {

	const [allCoins, setAllCoins] = useState<Coin[]>([]);
	const [favorite, setFavorite] = useState<Coin[]>([]);
	const [status, setStatus] = useState<boolean>(false);
	const [value, setValue] = useState('');


	useEffect(() => {
		chrome.runtime.sendMessage({action: 'fetchData'}, (response) => {
			if (!response) {
				console.log('No response resolved')
			};

			if (response.error) {
				console.log('Error', response.error)
			} else {
				setAllCoins(response.data)
			}
		});
	}, []);

	function ButtonStatus() {
		setStatus(prev => !prev)
	};

	useEffect(() => {
  		chrome.storage.local.get(['favorites'], (item) => {
    	setFavorite(item.favorites || []);
  		});
	}, []);

	useEffect(() => {
  		chrome.storage.local.set({ favorites: favorite });
	}, [favorite]);

	function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setValue(e.target.value)
	};


  return (
    <>
		<div className='container'>
		<Navbar/>
		{status
		?	
			<div className='input-wrapper'>
				<input
					className='input'
					type="text" 
					placeholder='Search' 
					onChange={(e) => inputChange(e)}
					value={value}
				/>
				<AllCoins favorite={favorite} setFavorite={setFavorite} coins={allCoins} value={value}/>
			</div>
		:		
			<FavoriteCoins favorite={favorite} setFavorite={setFavorite} coins={allCoins}/>
		}	
			<div className='footer'>
				<TabButtons status={status} changeStatus={ButtonStatus}/>
				<p className='developed'>Developed by stenjeet</p>
			</div>
		</div>
    </>
  )
}

export default App
