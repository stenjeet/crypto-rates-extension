import styles from './TabButtons.module.scss'

interface TabButtonsProps {
	status: boolean,
	changeStatus: () => void
}

 
const TabButtons: React.FC<TabButtonsProps> = ({status, changeStatus}) => {
	return (
		<div className={styles.TabButtons}>
			{status
			?
						<button
				className={styles.confirmBtn}
				onClick={changeStatus}
			>
				<svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#ffffff"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
			</button>
			:
						<button
				className={styles.addBtn}
				onClick={changeStatus}
			>
				<svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#ffffff"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
			</button>
			}
		</div>
	);
}
 
export default TabButtons;