import {Composition} from 'remotion';
import {Promo, DURATION_FRAMES} from './Promo';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Bulkskart"
    component={Promo}
    durationInFrames={DURATION_FRAMES}
    fps={30}
    width={1280}
    height={720}
  />
);
