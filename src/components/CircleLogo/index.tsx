import { logo_font } from '../../ui/fonts';

import styles from './circleLogo.module.css';
export default function CircleLogo() {
  return (
    <div className={`${styles.circleLogo} ${logo_font.className}`}>
      <span>BN.</span>
    </div>
  );
}
