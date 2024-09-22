import Container from '@/components/ui/container';
import { HandCoins, Headset, PlaySquare } from 'lucide-react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import AddBottomPaddingToBody from '@/components/ui/add-bottom-padding-to-body';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { GetCourseByAddressName } from '@/actions/course/get-course-by-address-name';
import {
  addCommaAndRetuenPersianStringNumber,
  calculateDiscountPercentageFromFullSpecialPrice,
  calculateDiscountPercentageFromSpecialPriceDif,
} from '@/lib/persian-string';
import { CartCourseType, useCart } from '@/components/cart/cart-context';
import AddToCart from '@/components/cart/add-to-cart';
import { getSession } from '@/actions/auth/auth';
import Link from 'next/link';
import { GetUserCourse } from '@/actions/course/get-user-course';
import { Metadata } from 'next';

export const generateMetadata = async ({
  params,
}: {
  params: {
    courseAddressName: string;
  };
}): Promise<Metadata> => {
  const courseAddressName = params.courseAddressName;

  const course = await GetCourseByAddressName(courseAddressName);
  return {
    title: course?.title,
  };
};


const CoursePage = async ({
  params,
}: {
  params: {
    courseAddressName: string;
  };
}) => {
  const session = await getSession();
  const courseAddressName = params.courseAddressName;

  const course = await GetCourseByAddressName(courseAddressName);

  const isStudent = await GetUserCourse(session?.user.id, course?.id);

  if (!course) notFound();

  const courseForCart = {
    courseId: course.id,
    courseAddressName: course.courseAddressName,
    courseTitle: course.title,
    price: course.price,
    sepcialPrice: course.specialPrice ?? 0,
    thumbnailImage: course.thumbnailImage,
    spotPlayerId: course.spotPlayerId,
    pending: true,
  } satisfies CartCourseType;

  const price = (
    <>
      {course.onSale ? (
        <div className='space-y-1'>
          <div className='flex items-center gap-x-2'>
            <p className='text-xl font-bold'>
              {/* ۱٫۶۹۹٫۰۰۰ */}
              {addCommaAndRetuenPersianStringNumber(
                `${course?.specialPrice ? course?.price - course?.specialPrice : course?.price}`,
              )}
            </p>
            <p className='text-sm text-gray-500'>تومانء</p>
          </div>
          {course?.specialPrice && (
            <div className='flex items-center justify-between'>
              <del className='translate-y-px text-sm text-gray-500'>
                {addCommaAndRetuenPersianStringNumber(`${course?.price}`)}
              </del>
              <span className='flex items-center rounded-full bg-blue-600 px-3 pt-[3px] text-sm text-white'>
                {calculateDiscountPercentageFromSpecialPriceDif(
                  course.price,
                  course.specialPrice,
                )}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className='space-y-1'>
          <div className='flex items-center text-gray-500'>
            <span className='ml-1 italic'>NaN</span>
            :price
          </div>
        </div>
      )}
    </>
  );

  return (
    <Container className='space-y-5 py-5'>
      <section className='flex flex-col gap-x-12 gap-y-8 md:flex-row'>
        <div className='flex w-full flex-col gap-y-5 md:w-2/3'>
          <div className='space-y-5'>
            <h1 className='text-lg font-extrabold md:text-2xl lg:text-3xl'>
              {course.title}
            </h1>
            <p className='text-justify text-base leading-loose text-muted-foreground md:text-sm lg:text-base'>
              {course.catchDesc}
            </p>
          </div>
          <div className='fixed bottom-0 left-0 z-10 w-full border-t bg-white p-3 dark:bg-slate-950 md:static md:mt-auto md:border-none md:p-0'>
            <div className='flex items-center justify-between'>
              {session?.user.id ? (
                <AddToCart course={courseForCart} isStudet={isStudent.code} />
              ) : (
                <Link href='/login'>
                  <Button>ورود</Button>
                </Link>
              )}
              <div className='md:hidden lg:block'>{price}</div>
            </div>
          </div>
        </div>

        <div className='flex w-full flex-col justify-between gap-y-5 md:w-3/5'>
          <div className='aspect-h-9 aspect-w-16 my-auto overflow-hidden rounded-md'>
            <Image
              src={course.thumbnailImage as string}
              alt={course.title}
              sizes='70vw'
              fill
            />
          </div>
          {/* <video
            preload='none'
            poster={course?.thumbnailImage}
            controls
            className='aspect-video my-auto rounded-md'
          >
            <source src={course?.introVideo} type='video/mp4' />
            مرورگر شما ویدیو را پشتیبانی نمی کند.
          </video> */}

          <div className='hidden md:mr-auto md:mt-auto md:flex md:flex-col lg:hidden'>
            {price}
          </div>
        </div>
      </section>

      <section className='grid gap-x-5 md:grid-cols-[1fr_auto]'>
        <div className='h-max space-y-3 py-5 md:order-1 md:w-80 md:rounded-md md:border md:p-5 md:shadow-sm'>
          <div className='flex items-center justify-start gap-x-2'>
            <HandCoins className='size-5' />
            <h3 className='font-bold'>ضمانت بازگشت وجه</h3>
          </div>
          <p className='text-balance text-base leading-loose text-muted-foreground md:text-wrap md:text-sm md:leading-relaxed'>
            ما ۷ روز ضمانت بازگشت وجه داریم. برای انصراف تنها کافی از طریق
            پشتیبانی اقدام کنید، بدون هیچ سوالی هزینه رو برمی‌گردونیم.
          </p>
        </div>

        <div className='space-y-3'>
          <div className='space-y-3 p-3 md:rounded-md md:border'>
            {/* loop */}

            {course.coursePoints.map((p, i) => (
              <div key={p.id}>
                <h2 className='mb-4 text-2xl font-black'>{p.point}</h2>
                <p className='text-justify text-lg leading-loose text-muted-foreground'>
                  {p.pointDesc}
                </p>
              </div>
            ))}
          </div>
          <div className='space-y-3 p-3 md:rounded-md md:border'>
            <h2 className='mb-4 text-2xl font-black'>سرفصل‌ها</h2>

            <Accordion type='single' collapsible>
              {course.couserChapter.map((chapter, i) => (
                <AccordionItem
                  key={chapter.id}
                  value='item-1'
                  className='last:border-none'
                >
                  <AccordionTrigger className='hover:no-underline'>
                    {chapter.chapterTitle}
                  </AccordionTrigger>
                  <AccordionContent className='space-y-2'>
                    {chapter.courseSubchapter.map((sub, i) => (
                      <div key={sub.id} className='rounded-md border p-3'>
                        {sub.subchapterTitle}
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <AddBottomPaddingToBody />
    </Container>
  );
};

export default CoursePage;
