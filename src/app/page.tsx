// app/page.tsx
import Home from './home/page';

// Route segment config is not inherited through a re-export, so `/` needs its
// own copy of what `/home` declares — without this the real homepage is
// prerendered once at build time and never picks up CMS edits.
export const revalidate = 300;

export default Home;
