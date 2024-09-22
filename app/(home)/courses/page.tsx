import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'دوره‌ها',
};

const Courses = () => {
  redirect('/courses/nextjs');

  return <div></div>;
};

export default Courses;
