import type { Coin } from "../../../types";

import styles from './FavoriteCoins.module.scss'



interface FavoriteCoinsProps {
	coins: Coin[],
	favorite: Coin[],
	setFavorite: React.Dispatch<React.SetStateAction<Coin[]>>;
}
 
const FavoriteCoins: React.FC<FavoriteCoinsProps> = ({coins, favorite, setFavorite}) => {


	function removeFavorite(coin: Coin) {
		setFavorite(favorite.filter(f => f.id !== coin.id))
	}

	const evailableCoins: Coin[] = coins.filter((coins) => favorite.some((f) => f.id == coins.id))

	return (
		<div className={styles.favoriteCoins}>
			{evailableCoins.length === 0 && <h4 style={{margin: 'auto', color: '#bdbdbd'}}>No coins in favorites yet.</h4>}
      		{evailableCoins.map((coin) => (
        		<div className={styles.coin} key={coin.id}>
					<img
						className={styles.img}
						src={`/icons/${coin.symbol}.png`}
						alt={coin.name}
						onError={(e) => {
    						e.currentTarget.onerror = null; 
    						e.currentTarget.src = '/icons/usd.png';
  						}}
					/>
					<div className={styles.coinInfo}>
						<h3 className={styles.name}>{coin.name}</h3>
						<div className={styles.coinPrice}>
							<p className={styles.price}>{coin.price_usd}$</p>
							<span className={`${styles.change} ${Number(coin.percent_change_24h) > 0 ? styles.positive : styles.negative}`}>
								{`${Number(coin.percent_change_24h) > 0 ? '+' : ''}${coin.percent_change_24h}%`}
							</span>
						</div>
					</div>
						<svg
							className={styles.deleteBtn}
							onClick={() => removeFavorite(coin)}
							xmlns="http://www.w3.org/2000/svg" 
							height="14px" viewBox="0 -960 960 960" 
							width="14px" 
							fill="#ffffff"
						>
							<path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
						</svg>
        		</div>
      		))}
		</div>
	);
}
 
export default FavoriteCoins;