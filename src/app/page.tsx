import { Container } from '@/components/layout/Container';
import { Hero } from '@/components/home/Hero';
import { About } from '@/components/home/About';
import { Experience } from '@/components/home/Experience';
import { Projects } from '@/components/home/Projects';
import { Notes } from '@/components/home/Notes';
import { OutsideScreen } from '@/components/home/OutsideScreen';
import { Contact } from '@/components/home/Contact';

export default function Home() {
  return <Container className="home-page"><Hero /><About /><Experience /><Projects /><Notes /><OutsideScreen /><Contact /></Container>;
}
