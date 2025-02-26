import styles from '../styles/PlayerCard.module.css';

export default function PlayerCard({ name, role, image }) {
  return (
    <div className={styles.card}>
      <img src={image || '/default-player.png'} alt={name} className={styles.image} />
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
}
