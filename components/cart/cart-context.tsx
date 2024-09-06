'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import {
  AddToCartAction,
  RemoveFromCartAction,
} from '@/actions/cart/update-cart';

export type CartCourseType = {
  courseId: number;
  courseTitle: string;
  courseAddressName: string;
  price: number;
  sepcialPrice: number;
  thumbnailImage: string;
  spotPlayerId: string
  pending: boolean;
};

type ProviderProps = {
  cartId: number | undefined;
  userId: number | undefined;
  initialCourses: CartCourseType[] | undefined;
  children: React.ReactNode;
};

type ContextType = {
  cartId: number | undefined;
  userId: number | undefined;
  totalPrice: number;
  discountedPrice: number;
  courses: CartCourseType[];
  cartPending: boolean;
  addCourse: (course: CartCourseType) => void;
  removeCourse: (course: CartCourseType) => void;
  // clearCart: () => void;
};

const CartCtx = createContext<ContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartCtx);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({
  cartId,
  userId,
  children,
  initialCourses,
}: ProviderProps) => {
  const [courseState, setCourseState] = useState(initialCourses ?? []);
  const [cartPending, setCartPending] = useState(false);

  // const totalPrice = courseState?.reduce(
  //   (total, course) =>
  //     total + (course.sepcialPrice ? course.sepcialPrice : course.price),
  //   0,
  // );

  const totalPrice = courseState.reduce((t, c) => t + c.price, 0);

  const discountedPrice = courseState.reduce((t, c) => t + c.sepcialPrice, 0);

  const addCourse = async (course: CartCourseType) => {
    try {
      setCartPending(true);
      setCourseState((prev) => [...prev, course]);
      const id = course.courseId;
      const res = await AddToCartAction(
        cartId,
        course.courseId,
        userId as number,
      );

      if (res.success) {
        setCourseState((prev) =>
          prev.map((c) => (c.courseId === id ? { ...c, pending: false } : c)),
        );
      } else {
        setCourseState((prev) => prev.filter((c) => c.courseId !== id));
        toast.error('خطایی رخ داد');
      }
    } catch (error) {
      toast.error('خطایی رخ داد');
    } finally {
      setCartPending(false);
    }
  };

  const removeCourse = async (course: CartCourseType) => {
    try {
      // setCartPending(true);
      setCourseState((prev) =>
        prev.filter((c) => c.courseId !== course.courseId),
      );

      const res = await RemoveFromCartAction(cartId as number, course.courseId);

      if (res.success) {
        // done
      } else {
        setCourseState((prev) => [...prev, course]);
        toast.error('خطایی رخ داد');
      }
    } catch (error) {
      toast.error('خطایی رخ داد');
    } finally {
      // setCartPending(false);
    }
  };

  const value = useMemo(
    () => ({
      cartId,
      userId,
      totalPrice,
      discountedPrice,
      cartPending,
      courses: courseState,
      addCourse,
      removeCourse,
    }),
    [courseState],
  );

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
};
