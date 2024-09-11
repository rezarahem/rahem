'use client';

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  use,
  useEffect,
} from 'react';
import toast from 'react-hot-toast';
import {
  AddToCartAction,
  RemoveFromCartAction,
} from '@/actions/cart/update-cart';
import { GetCartData } from '@/actions/cart/get-cart-data';
import { ClearCart } from '@/actions/cart/clear-cart';

export type CartCourseType = {
  courseId: number;
  courseTitle: string;
  courseAddressName: string;
  price: number;
  sepcialPrice: number;
  thumbnailImage: string;
  spotPlayerId: string;
  pending: boolean;
};

type ProviderProps = {
  // cartId: number | undefined;
  // userId: number | undefined;
  // initialCourses: CartCourseType[] | undefined;
  children: React.ReactNode;
};

type ContextType = {
  cartId: number | undefined;
  userId: number | undefined;
  price: number;
  specialPrice: number;
  courses: CartCourseType[];
  cartPending: boolean;
  addCourse: (course: CartCourseType) => void;
  removeCourse: (course: CartCourseType) => void;
  clearCart: () => void;
};

const CartCtx = createContext<ContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartCtx);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: ProviderProps) => {
  const [cartId, setCartId] = useState<number | undefined>(undefined);
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [isMounted, setIsMounted] = useState(false);
  const [courseState, setCourseState] = useState<CartCourseType[]>([]);
  const [cartPending, setCartPending] = useState(false);
  // const [discountedPrice, setDiscountedPrice] = useState(0);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const fetchinitialCart = async () => {
      try {
        const initialCart = await GetCartData();

        setCourseState(initialCart.courses ?? []);
        setCartId(initialCart.cartId);
        setUserId(initialCart.userId);
      } catch (error) {} finally {
         
      }
    };

    if (isMounted) {
      fetchinitialCart();
    }
  }, [isMounted]);

 

  // useEffect(() => {
  //   if (courseState.length > 0) {
  //     const total = courseState.reduce((t, c) => t + c.price, 0);
  //     const discount = courseState.reduce((t, c) => t + c.sepcialPrice, 0);

  //     setTotalPrice(total);
  //     setDiscountedPrice(discount);
  //   } else {
  //     setTotalPrice(0);
  //     setDiscountedPrice(0);
  //   }
  // }, [courseState]);

  const price = courseState.reduce((t, c) => t + c.price, 0);

  const specialPrice = courseState.reduce((t, c) => t + c.sepcialPrice, 0);

  const addCourse = async (course: CartCourseType) => {
    try {
      setCartPending(true);
      setCourseState((prev) => [
        ...prev,
        course,
        // {
        //   spotPlayerId: course.spotPlayerId,
        //   courseAddressName: course.courseAddressName,
        //   courseId: course.courseId,
        //   courseTitle: course.courseTitle,
        //   pending: course.pending,
        //   price: course.price,
        //   sepcialPrice: course.sepcialPrice,
        //   thumbnailImage: course.thumbnailImage,
        //   // ...course,
        // },
      ]);
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

  const clearCart = async () => {
    try {
      // setCartPending(true);
      const prev = courseState
      setCourseState([]);

      const res = await ClearCart(cartId as number);

      if (res.success) {
        // done
      } else {
        setCourseState(prev);
        toast.error('خطایی رخ داد');
      }
    } catch (error) {
      toast.error('خطایی رخ داد');
    } finally {
      // setCartPending(false);
    }
  }

  const value = useMemo(
    () => ({
      cartId,
      userId,
      price,
      specialPrice,
      cartPending,
      courses: courseState,
      addCourse,
      removeCourse,
      clearCart
    }),
    [courseState],
  );

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
};
