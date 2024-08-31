'use client';

import { useEffect } from 'react';
import { useWindowSize } from 'usehooks-ts';

const MOBILE_BREAKPOINT = 767;
const BOTTOM_PADDING = '62px';

const AddBottomPaddingToBody = () => {
  const { width } = useWindowSize();

  useEffect(() => {
    if (width <= MOBILE_BREAKPOINT) {
      document.body.style.paddingBottom = BOTTOM_PADDING;
    } else {
      document.body.style.paddingBottom = '0';
    }

    return () => {
      document.body.style.paddingBottom = '0';
    };
  }, [width]);

  return null;
};

export default AddBottomPaddingToBody;
