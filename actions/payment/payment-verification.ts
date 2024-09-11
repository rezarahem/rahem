'use server';

import axios from 'axios';
import { getSession } from '../auth/auth';
import { AuthorizeUser } from '../auth/authorize-user';
import { db } from '@/drizzle/db';
import { and, eq } from 'drizzle-orm';
import { License, Order, UserCourse } from '@/drizzle/drizzle';

type zarinpalRes = {
  code: 100 | 101;
  message: string;
  card_hash: string;
  card_pan: string;
  ref_id: number;
  fee_type: string;
  fee: number;
};

export const PaymentVerification = async (
  authority: string,
): Promise<{
  success: boolean;
  ordreVerification?: boolean;
  orderNumber?: number;
  orderFinalPrice?: number;
  errorMessage?: string;
  orderRefId?: number;
  code101?: boolean;
}> => {
  try {
    const authorizeUser = await AuthorizeUser();
    const session = await getSession();

    if (!authorizeUser || !authorizeUser.success || !session) {
      return {
        success: false,
        errorMessage: authorizeUser.errorMessage ?? 'خطایی رخ داد',
      };
    }

    const order = await db.query.Order.findFirst({
      where: and(
        eq(Order.userId, session.user.id),
        eq(Order.authority, authority),
      ),
      with: {
        orderItem: {
          columns: {
            courseId: true,
            spotPlayerId: true,
          },
        },
      },
    });

    if (!order) {
      return {
        success: false,
        errorMessage: 'ورودی اشتباه',
      };
    }

    const res = await axios.post(
      'https://api.zarinpal.com/pg/v4/payment/verify.json',
      {
        merchant_id: process.env.ZARINPAL_MERCHANT_ID,
        authority,
        amount: order.finalPrice,
      },
    );

    const { code, ref_id } = res.data.data as zarinpalRes;

    if (!res || !code) {
      return {
        success: false,
        errorMessage: 'خطایی رخ داد',
      };
    }

    //

    if (code === 100) {
      const spotPlayerIds = order.orderItem.map(
        (i) => i.spotPlayerId,
      ) satisfies string[];

      const courseLicense = await axios.post(
        'https://panel.spotplayer.ir/license/edit/',
        {
          test: true,
          course: spotPlayerIds,
          name: session.user.userName,
          watermark: { texts: [{ text: session.user.phoneNumber }] },
        },
        {
          headers: {
            $API: process.env.SPOTPLAYER_KEY,
            $LEVEL: -1,
          },
        },
      );

      const txRes = await db.transaction(async (tx) => {
        const [license] = await tx
          .insert(License)
          .values({
            key: courseLicense.data.key as string,
          })
          .returning();

        const userCourse = await tx
          .insert(UserCourse)
          .values(
            order.orderItem.map((item) => ({
              courseId: item.courseId,
              userId: order.userId,
            })),
          )
          .returning();

        const [updatedOrder] = await tx
          .update(Order)
          .set({
            verified: true,
            refNumber: ref_id.toString(),
            licenseId: license.id,
          })
          .where(eq(Order.id, order.id))
          .returning();

        // if (!updatedOrder) {
        //   return {
        //     success: false,
        //     errorMessage: 'خطایی رخ داد',
        //   };
        // }

        return {
          success: true,
          ordreVerification: true,
          orderNumber: updatedOrder.id,
          orderFinalPrice: updatedOrder.finalPrice,
          orderRefId: ref_id,
        };
      });

      return txRes;

      // if (!txRes || !txRes.success)
      // const [license] = await db
      //   .insert(License)
      //   .values({
      //     key: courseLicense.data.key as string,
      //   })
      //   .returning();

      // const userCourse = await db
      //   .insert(UserCourse)
      //   .values(
      //     order.orderItem.map((item) => ({
      //       courseId: item.courseId,
      //       userId: order.userId,
      //     })),
      //   )
      //   .returning();

      // const [updatedOrder] = await db
      //   .update(Order)
      //   .set({
      //     verified: true,
      //     refNumber: ref_id.toString(),
      //     licenseId: license.id,
      //   })
      //   .where(eq(Order.id, order.id))
      //   .returning();

      // if (!updatedOrder) {
      //   return {
      //     success: false,
      //     errorMessage: 'خطایی رخ داد',
      //   };
      // }

      // return {
      //   success: true,
      //   ordreVerification: true,
      //   orderNumber: updatedOrder.id,
      //   orderFinalPrice: updatedOrder.finalPrice,
      //   orderRefId: ref_id,
      // };
    }

    if (code === 101) {
      return {
        success: true,
        code101: true,
      };
    }

    return {
      success: false,
      errorMessage: 'خطایی رخ داد',
    };
  } catch (error) {
    // console.log(error);

    return {
      success: false,
      errorMessage: 'خطایی رخ داد',
    };
  }
};
 