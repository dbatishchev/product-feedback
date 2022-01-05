import React from 'react';
import styles from './Avatar.module.css';
import { User } from '../../../features/users/types/User';

type AvatarProps = {
  user: User
};

const Avatar: React.FC<AvatarProps> = ({ user }) => (
  <img className={styles.avatar} src={`${user.image.slice(1)}`} alt="" />
);

export default Avatar;
