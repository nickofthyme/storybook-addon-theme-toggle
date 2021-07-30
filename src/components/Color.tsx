import { styled } from '@storybook/theming';

import React from 'react'

interface Props {
  background: string;
  imageUrl?: string;
}

export const Color = ({ background, imageUrl }: Props) => {
  return (
    <Background background={background}>
      {imageUrl && <Icon src={imageUrl} />}
    </Background>
  )
}

export const Background = styled.div(
  ({ background }: { background: string }) => ({
    borderRadius: '1rem',
    height: '1rem',
    width: '1rem',
    position: 'relative',
    background,
  }),
  ({ theme: { appBorderColor } }) => ({
    boxShadow: `${appBorderColor} 0 0 0 1px inset`,
  })
);

export const Icon = styled.img({
  position: 'absolute',
  top: '0.2rem',
  left: '0.2rem',
  height: '0.6rem',
  width: '0.6rem',
});
