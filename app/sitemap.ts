import { db } from '@/drizzle/db';
import { MetadataRoute } from 'next';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const courses = await db.query.Course.findMany();

  const coursesEntrites: MetadataRoute.Sitemap = courses.map(
    ({ courseAddressName }) => ({
      url: `rahem.dev/courses/${courseAddressName}`,
      // lastModified: updatedAt,
      // priority: 1,
    }),
  );
  return [...coursesEntrites];
};

export default sitemap;
