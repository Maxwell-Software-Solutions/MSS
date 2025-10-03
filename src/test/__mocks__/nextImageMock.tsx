/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import type { ImgHTMLAttributes, ReactElement } from 'react';

type Props = ImgHTMLAttributes<HTMLImageElement> & { 
  alt?: string; 
  priority?: boolean;
  fill?: boolean;
  unoptimized?: boolean;
  blurDataURL?: string;
  placeholder?: string;
  sizes?: string;
  fetchPriority?: string;
};

// Simple mock for next/image in tests
const NextImage = ({ 
  alt = '', 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  priority: _priority, 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fill: _fill,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  unoptimized: _unoptimized,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  blurDataURL: _blurDataURL,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  placeholder: _placeholder,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sizes: _sizes,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fetchPriority: _fetchPriority,
  ...props 
}: Props): ReactElement => {
  // Filter out Next.js specific props as they're not valid for img elements
  return <img alt={alt} {...props} />;
};

export default NextImage;
