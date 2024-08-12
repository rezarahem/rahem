import Container from '@/components/ui/container';
import Image from 'next/image';

const AboutUs = () => {
  const aboutUsTopics: { label: string; content: string }[] = [
    {
      label: 'rahem.dev',
      content:
        'در rahem.dev، با ویدیوهای ساده، برنامه نویسی وب رو آموزش می‌دم. هدفم اینه که یه محیط دوستانه و راحت براتون فراهم کنم تا بدون هیچ مشکلی برنامه نویسی رو یاد بگیرید. خودمم این مشکلات رو تجربه کردم، پس می‌دونم چقدر ممکنه سخت باشه. خوش‌حال میشم که در این مسیر همراهتون باشم.',
    },
    {
      label: 'فراتر از یک دوره معمولی',
      content:
        'اینجا یه جای خیلی خاصه! به جای اینکه فقط یک سایت آموزشی باشه، یک جامعه پویا و دوستانه هم هست. اینجا علاوه بر دوره‌ها و تمرینات، میشه با آدمای هم‌فکر و هم‌نظر آشنا شد و در مورد هر چیزی از استخدام تا زبان‌های برنامه‌نویسی صحبت کرد. هر دوره یک گروه مخصوص خودش رو داره که علاوه بر موضوعات مربوط به دوره، می‌شه در مورد هر چیز دیگه‌ای صحبت کرد. در کل اینجا جمع، جمع رفقاست!',
    },
    {
      label: 'دوره‌ها',
      content:
        'همه تلاشم رو کردم تا دوره‌ها به زبانی ساده و دوستانه باشند. برام خیلی مهمه که شما به راحتی مفاهیم و اصول رو درک کنید. علاوه بر اون، تمامی دوره‌ها پروژه محور هستند و پس از پایان هر بخش، یک پروژه کامل رو با هم انجام میدیم. همچنین، به نظر من هر دوره‌ای در زمینه برنامه‌نویسی وب همیشه باید به‌روز باشه. بنابراین، اگر هر یک از تکنولوژی‌های استفاده شده در دوره‌ها آپدیت بشن، بخش مربوطه سریعا به‌روزرسانی میشه و ویدیوها مربوطه هم دوباره ضبط میشن. این آپدیت‌ها به رایگان برای همه شرکت‌کنندگان دوره‌ها قابل دسترس خواهد بود.',
    },
    {
      label: 'ما از چه تکنولوژی‌ها و زبان‌هایی استفاده می‌کنیم؟',
      content:
        'تمرکز من در rahem.dev بر روی اکوسیستم Reactjs، Nodejs، و Nextjs است. برای زبان هم از javascript و typescript استفاده می‌کنم. البته بیشتر تایپ‌اسکریپت، ولی در هر حال این دوتا تقریبا یک زبان هستند. کار کردن با این تکنولوژی‌ها خیلی برام لذت بخشه و حالا حالا نمی‌‌خوام به صورت جدی سراغ چیز دیگه برم. ولی شاید در آینده خیلی دور سراغ زبان‌ها و فیلد‌ها دیگه دنیای برنامه‌نویسی هم بریم.',
    },
  ];

  const whoAmI = {
    label: 'مدرس دوره‌ها کیه؟',
    name: 'رضا رحیمی',
    imageUrl: 'https://avatars.githubusercontent.com/u/101524351',
    content:
      'تو دوران دانشگاه به واسطه علاقم به بازی‌های ویدیویی شروع به یاد‌‌گیری زبان‌ برنامه‌نویسی #C کردم. یه چیز‌هایی هم درست کردم ولی خیلی زود برنامه‌نویسی وب کشف کردم و از اون موقع یعنی سال ۹۹ دارم تو این حوزه کار می‌کنم.',
  };

  return (
    <Container className='py-10'>
      <div className='space-y-5'>
        <div className='space-y-4'>
          {aboutUsTopics.map(({ label, content }) => (
            <div key={label} className='space-y-2'>
              <h2 className='text-3xl font-extrabold leading-relaxed'>
                {label}
              </h2>
              <p className='text-justify text-lg leading-loose text-muted-foreground'>
                {content}
              </p>
            </div>
          ))}
        </div>

        <div className='flex flex-col gap-y-7'>
          <h2 className='text-3xl font-extrabold leading-relaxed'>
            {whoAmI.label}
          </h2>
          <div className='grid grid-cols-1 gap-x-6 sm:grid-cols-4'>
            <div className='aspect-h-3 aspect-w-5 relative col-span-4 sm:aspect-h-5 sm:aspect-w-5 lg:aspect-h-6 lg:aspect-w-5 sm:col-span-1'>
              <Image
                fill
                className='rounded-md object-cover object-top'
                src={whoAmI.imageUrl}
                quality={100}
                sizes='(max-width: 768px) 100vw, 50vw'
                alt={whoAmI.name}
              />
            </div>
            <div className='col-span-4 mt-3 sm:col-span-3'>
              <h3 className='text-xl font-bold'>{whoAmI.name}</h3>
              <p className='mt-6 text-justify text-lg leading-loose text-muted-foreground sm:mt-3'>
                {whoAmI.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AboutUs;
