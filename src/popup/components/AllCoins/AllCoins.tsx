import { useCallback, useMemo } from "react";
import type { Coin } from "../../../types";

import styles from './AllCoins.module.scss';

interface AllCoinsProps {
	coins: Coin[],
	favorite: Coin[],
	setFavorite: React.Dispatch<React.SetStateAction<Coin[]>>,
	value: string,
}
 
const AllCoins: React.FC<AllCoinsProps> = ({coins, favorite, setFavorite, value}) => {

	const addFavorite = useCallback((coin: Coin) => {
		setFavorite(prev => 
			prev.some(f => f.id === coin.id)
			? prev
			: [...prev, coin]
		);
	}, []);


	const favoriteIds = useMemo(() => {
		return new Set(favorite.map(f => f.id));
	}, [favorite]);


	const availableCoins = useMemo(() => {
		const search = value.toLowerCase();

		return coins.filter(
			coin => !favoriteIds.has(coin.id) &&
			coin.name.toLowerCase().includes(search)
		)
	}, [coins, favoriteIds, value]);



	


	return (
		<div className={styles.allCoins}>
			{availableCoins.length === 0 && 
				<div className={styles.loading}>
					<h4 style={{margin: 'auto', color: '#bdbdbd'}}>Loading...</h4>
				</div>
			}
      		{availableCoins.map((coin) => (
        		<div className={styles.coin} key={coin.id}>
					<div className={styles.main}> 
						<img
							className={styles.img}
							src={`/icons/${coin.symbol}.png`}
							alt={coin.name}
							onError={(e) => {
    							e.currentTarget.onerror = null; 
    							e.currentTarget.src = '/icons/usd.png';
  							}}
						/>
						<button
							className={styles.btn}
							onClick={() => addFavorite(coin)}
						>
							Add
						</button>
					</div>
          			<p className={styles.name}>{coin.name}</p>
        		</div>
      		))}
		</div>
	);
}
 
export default AllCoins;