'use client';

import Link from 'next/link';
import Container from '../ui/container';
import { useCart } from './cart-context';
import { Button } from '../ui/button';
import Image from 'next/image';
import {
  addCommaAndRetuenPersianStringNumber,
  calculateDiscountPercentageFromSpecialPrice,
  calculateDiscountSpecialPriceFromPercentage,
} from '@/lib/persian-string';
import { useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import { CircleCheck } from 'lucide-react';
import RemoveBtnCourseFromCartBtn from './remove-course-btn';
import { Input } from '../ui/input';
import { CheckDiscount } from '@/actions/cart/check-discount';
import {
  CreateOrder,
  OrderItemType,
  OrderType,
} from '@/actions/order/create-order';
import { useRouter } from 'next/navigation';

const calculatePaidPrice = (price: number, specialPrice?: number): number => {
  return specialPrice !== undefined &&
    specialPrice !== null &&
    specialPrice !== 0
    ? specialPrice
    : price;
};

const CartClient = () => {
  const { totalPrice, courses, userId, discountedPrice } = useCart();

  const [isValidDiscount, setIsValidDiscount] = useState(false);
  const [userDiscountCode, setUserDiscountCode] = useState('');
  const [special, setSpecial] = useState(discountedPrice);
  const [finalPrice, setFinalPrice] = useState(
    calculatePaidPrice(totalPrice, discountedPrice),
  );

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const validateDiscount = () => {
    try {
      startTransition(async () => {
        const res = await CheckDiscount(userDiscountCode);

        if (!res.success || !res.discountCode) {
          toast.error(res.errorMessage || 'خطایی رخ داد');
          return;
        }
        const code = res.discountCode;
        setIsValidDiscount(res.success);

        if (code.isPercentage) {
          setFinalPrice(
            calculateDiscountSpecialPriceFromPercentage(
              finalPrice,
              res.discountCode.discount,
            ),
          );
        } else {
          setFinalPrice((prev) => prev - code.discount);
        }
        toast.success('تحفیف ثبت شد');
      });
    } catch (error) {
      toast.error('خطایی رخ داد');
    }
  };

  const disableDiscount = () => {
    setUserDiscountCode('');
    setSpecial(discountedPrice);
    setIsValidDiscount(false);
  };

  const pay = () => {
    try {
      startTransition(async () => {
        if (!userId) return;

        const userOrder = {
          userId,
          totalPrice,
          discountedPrice,
          finalPrice,
        } satisfies OrderType;

        const orderItems = courses.map((c) => ({
          courseId: c.courseId,
          itemPrice: c.price,
          discountedItemPrice: c.sepcialPrice,
          finalItemPrice: c.sepcialPrice ? c.sepcialPrice : c.price,
          spotPlayerId: c.spotPlayerId,
        })) satisfies OrderItemType[];

        const res = await CreateOrder({
          order: userOrder,
          orderItems,
        });

        if (!res || !res.success) {
          toast.error(res.errorMessage || 'خطایی رخ داد');
          return;
        }

        if (res.success && res.payLink) {
          router.push(res.payLink);
        } else {
          toast.error('خطایی رخ داد');
        }
      });
    } catch (error) {
      toast.error('خطایی رخ داد');
    }
  };

  if (totalPrice === 0)
    return (
      <Container>
        <div className='mx-auto flex h-60 flex-col items-center justify-center gap-y-3'>
          <p className='text-lg font-bold'>رفیق، سبد خریدت خالیه 😩</p>

          <Link href='/courses/nextjs' className='rounded-md px-4 py-2'>
            <Button>
              <strong>دوره نکست ۱۴</strong>
            </Button>
          </Link>
        </div>
      </Container>
    );

  return (
    <Container className='my-4 flex-col space-y-3'>
      <div>
        <p className='text-2xl font-extrablack'>سبد خرید شما</p>
      </div>
      <div className='grid w-full grid-cols-12 gap-3'>
        <div className='col-span-full h-min space-y-2 md:col-span-8'>
          {courses.map((c) => (
            <div
              key={c.courseId}
              className='flex flex-col justify-between gap-x-3 space-y-5 rounded-md border p-4 shadow-sm sm:flex-row sm:space-y-0'
            >
              <div className='grid grid-cols-5 items-center gap-3'>
                <div className='aspect-h-9 aspect-w-16 relative col-span-2 overflow-hidden rounded-md'>
                  <Image
                    src={c.thumbnailImage}
                    alt={c.courseTitle}
                    fill
                    sizes='70vw'
                  />
                </div>
                <div className='col-span-3'>
                  <p className='text-lg font-extrabold'>{c.courseTitle}</p>
                </div>
              </div>

              <div className='flex items-center justify-between gap-x-3'>
                <div className='space-y-1'>
                  <div className='flex items-center gap-x-2'>
                    <p className='text-lg font-bold lg:text-xl'>
                      {addCommaAndRetuenPersianStringNumber(
                        `${c.sepcialPrice ? c.sepcialPrice : c.price}`,
                      )}
                    </p>
                    <p className='text-xs text-gray-500 lg:text-sm'>تومانء</p>
                  </div>
                  {c.sepcialPrice ? (
                    <div className='flex items-center justify-between'>
                      <del className='text-xs text-gray-500 lg:text-sm'>
                        {addCommaAndRetuenPersianStringNumber(`${c?.price}`)}
                      </del>
                      <span className='flex items-center rounded-full bg-blue-600 px-3 pt-[3px] text-xs text-white lg:text-sm'>
                        {calculateDiscountPercentageFromSpecialPrice(
                          +c.price,
                          +c.sepcialPrice,
                        )}
                      </span>
                    </div>
                  ) : null}
                </div>
                <RemoveBtnCourseFromCartBtn course={c} />
              </div>
            </div>
          ))}
        </div>
        <div className='col-span-full h-min rounded-md p-4 md:col-span-4 md:border md:shadow-sm'>
          <div className='w-full divide-y'>
            <div className='pb-5'>
              <p className='font-bold'>اطلاعات پرداخت</p>
            </div>
            <div className='flex items-center gap-x-2 py-5'>
              {isValidDiscount ? (
                <div className='flex w-full items-center gap-x-2 rounded-md border px-3 py-1'>
                  <CircleCheck className='size-5 text-green-500' />
                  {userDiscountCode}
                </div>
              ) : (
                <Input
                  value={userDiscountCode}
                  onChange={(e) => {
                    e.preventDefault();
                    setUserDiscountCode(e.target.value);
                  }}
                  placeholder='کد تخفیف'
                />
              )}
              {isValidDiscount ? (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    disableDiscount();
                  }}
                >
                  لغو
                </Button>
              ) : (
                <Button disabled={isPending} onClick={validateDiscount}>
                  ثبت
                </Button>
              )}
            </div>
            <div>
              <div className='flex items-center justify-between py-5'>
                <p className='font-bold'>مبلغ قابل پرداخت</p>
                <div className='space-y-1'>
                  <div className='flex items-center justify-between gap-x-3'>
                    <div className='space-y-1'>
                      <div className='flex items-center gap-x-2'>
                        <p className='text-lg font-bold lg:text-xl'>
                          {addCommaAndRetuenPersianStringNumber(
                            `${finalPrice}`,
                          )}
                        </p>
                        <p className='text-xs text-gray-500 lg:text-sm'>
                          تومانء
                        </p>
                      </div>
                      {discountedPrice ? (
                        <div className='flex items-center justify-between'>
                          <del className='text-xs text-gray-500 lg:text-sm'>
                            {addCommaAndRetuenPersianStringNumber(
                              `${totalPrice}`,
                            )}
                          </del>
                          <span className='flex items-center rounded-full bg-blue-600 px-3 pt-[3px] text-xs text-white lg:text-sm'>
                            {calculateDiscountPercentageFromSpecialPrice(
                              +totalPrice,
                              +discountedPrice,
                            )}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {/* <div className='flex items-center gap-x-2'>
                    <p className='text-lg font-bold'>
                      {addCommaAndRetuenPersianStringNumber(`${finalPrice}`)}
                    </p>
                    <p className='mr-auto text-sm text-gray-500'>تومانء</p>
                  </div> */}
                  {/* {isValidDiscount ? (
                    <div className='flex items-center justify-between gap-x-2'>
                      <del className='text-xs text-gray-500 lg:text-sm'>
                        {addCommaAndRetuenPersianStringNumber(`${totalPrice}`)}
                      </del>
                      <span className='flex items-center rounded-full bg-blue-600 px-3 pt-[2px] text-xs text-white lg:text-sm'>
                        {calculateDiscountPercentageFromSpecialPrice(
                          totalPrice as number,
                          +finalPrice,
                        )}
                      </span>
                    </div>
                  ) : null} */}
                </div>
              </div>
              <div className='mt-5'>
                <Button disabled={isPending} onClick={pay}>
                  پرداخت
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CartClient;
