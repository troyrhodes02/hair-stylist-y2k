import { type NextPage } from 'next';
import { HeroSection, MeetStylist, MyWork } from './components';

const Home: NextPage = () => {
  return (
    <main>
      <HeroSection />
      <MeetStylist />
      <MyWork />
    </main>
  );
};

export default Home;
