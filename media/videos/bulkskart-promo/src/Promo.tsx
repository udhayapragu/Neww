import {AbsoluteFill, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';

// 15 s at 30 fps, scene starts follow the storyboard: 0-3, 3-6, 6-11, 11-13, 13-15 s.
export const DURATION_FRAMES = 450;

const ease = Easing.bezier(0.16, 1, 0.3, 1);

const ramp = (f: number, input: number[], output: number[], easing = ease) =>
  interpolate(f, input, output, {easing, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

// Storyboard panels are wider than 16:9 or narrower, so show the whole still
// uncropped over a blurred copy of itself instead of cropping away headline text.
const Still: React.FC<{name: string; style?: React.CSSProperties}> = ({name, style}) => {
  const src = staticFile(`stills/${name}`);
  const layer: React.CSSProperties = {position: 'absolute', inset: 0, width: '100%', height: '100%'};
  return (
    <div style={{position: 'absolute', inset: 0, ...style}}>
      <Img src={src} style={{...layer, objectFit: 'cover', filter: 'blur(28px) brightness(0.6)', transform: 'scale(1.15)'}} />
      <Img src={src} style={{...layer, objectFit: 'contain'}} />
    </div>
  );
};

// 0-3 s: problem. Dolly Zoom (12) into the worried face, then Frame Escape (03) slides it out.
const Problem: React.FC = () => {
  const f = useCurrentFrame();
  const dolly = ramp(f, [0, 90], [1, 1.22], Easing.linear);
  const escape = ramp(f, [70, 90], [0, -1400], Easing.in(Easing.cubic));
  return (
    <AbsoluteFill style={{background: '#0b0b0b'}}>
      <AbsoluteFill style={{transform: `translateX(${escape}px)`}}>
        <Still name="scene1-problem.png" style={{transform: `scale(${dolly})`}} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// 3-6 s: introduce Bulkskart. Snap Zoom (04) punches in on the beat.
const Intro: React.FC = () => {
  const f = useCurrentFrame();
  const punch = ramp(f, [0, 6, 14, 30], [1, 1.12, 1.04, 1.04]);
  return (
    <AbsoluteFill style={{background: '#111'}}>
      <Still name="scene2-intro.png" style={{transform: `scale(${punch})`}} />
    </AbsoluteFill>
  );
};

// 6-11 s: global reach. Zoom Portal (07) opens the frame; Digital Zoom (18) pushes into the map.
const Reach: React.FC = () => {
  const f = useCurrentFrame();
  const portal = ramp(f, [0, 20], [0, 150]);
  const push = ramp(f, [30, 130], [1, 1.45], Easing.inOut(Easing.cubic));
  return (
    <AbsoluteFill style={{background: '#050510', clipPath: `circle(${portal}% at 50% 50%)`}}>
      <Still name="scene3-reach.png" style={{transform: `scale(${push})`, transformOrigin: '50% 55%'}} />
    </AbsoluteFill>
  );
};

// 11-13 s: handshake. Zoom Through Cut (15) enters from the previous scene, Orbit (01) approximated by a 3D sweep.
const Handshake: React.FC = () => {
  const f = useCurrentFrame();
  const enter = ramp(f, [0, 15], [1.35, 1]);
  const orbit = ramp(f, [0, 60], [-14, 14], Easing.linear);
  return (
    <AbsoluteFill style={{background: '#050505', perspective: 1000}}>
      <AbsoluteFill style={{transform: `scale(${enter}) rotateY(${orbit}deg)`}}>
        <Still name="scene4-handshake.png" />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// 13-15 s: call to action. Studio Reveal (09): fade up from black while the frame dollies out.
const Cta: React.FC = () => {
  const f = useCurrentFrame();
  const fade = ramp(f, [0, 20], [0, 1], Easing.linear);
  const dolly = ramp(f, [0, 60], [1.08, 1]);
  return (
    <AbsoluteFill style={{background: '#000', opacity: fade}}>
      <Still name="scene5-cta.png" style={{transform: `scale(${dolly})`}} />
    </AbsoluteFill>
  );
};

export const Promo: React.FC = () => (
  <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
    <Sequence from={0} durationInFrames={90}>
      <Problem />
    </Sequence>
    <Sequence from={90} durationInFrames={90}>
      <Intro />
    </Sequence>
    <Sequence from={180} durationInFrames={150}>
      <Reach />
    </Sequence>
    <Sequence from={330} durationInFrames={60}>
      <Handshake />
    </Sequence>
    <Sequence from={390} durationInFrames={60}>
      <Cta />
    </Sequence>
  </AbsoluteFill>
);
