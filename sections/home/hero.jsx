import { APP_SECTIONS } from '@/lib/constants';

export function Hero() {
  return (
    <section
      id={APP_SECTIONS.ABOUT}
      className="scroll-mt-32 pb-20 pt-16 sm:pb-2 sm:pt-24"
      aria-labelledby="about-heading"
    >
      <h2 id="about-heading" className="sr-only">
        À propos
      </h2>
      <div className="text-body text-fgSoft max-w-2xl space-y-5 leading-relaxed">
        <p>
          I build <b>digital spaces</b> the way one shapes a <b>passageway</b> with precision,
          balance, and curiosity. My journey in development has taught me to seek
          <b> harmony between code and human experience</b>, between the logic of a system and the
          sensitivity of an interface.
        </p>
        <p>
          What I create are not just applications, but <b>coherent systems</b>, able to grow,
          self-observe, and remain beautiful over time. I give as much attention to the
          <b> fluidity of a motion</b> as to the <b>stability of a deployment</b>. Behind every
          project lies the desire to <b>make technology invisible</b>, to leave room for usage for
          the quiet sensation of a product that breathes.
        </p>
        <p>
          For me, <b>writing code is about tracing paths</b> between logic and perception, between
          the rigor of calculation and the intuition of the gesture. I try to create forms that stand
          on their own, and sometimes, touch something human.
        </p>
        <p>Development has become my way of exploring the world.</p>
      </div>
    </section>
  );
}

